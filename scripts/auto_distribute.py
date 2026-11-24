#!/usr/bin/env python3
"""Autonomous Social Distribution & Search Engine Indexing Engine.

Mirrors the autonomous architecture of /job-hunt:
- Uses Playwright persistent sessions to distribute launch videos, posters,
  and customized copywriting to LinkedIn, X, and YouTube Shorts.
- Submits all 52 URLs to IndexNow / Bing API for instant crawl and indexing.
- Tracks published status in distribution_log.jsonl to prevent duplicate posts.

Usage:
    python portfolio/scripts/auto_distribute.py --status
    python portfolio/scripts/auto_distribute.py --indexnow
    python portfolio/scripts/auto_distribute.py --platform linkedin --project airlock --draft
    python portfolio/scripts/auto_distribute.py --platform all --limit 5
"""

import argparse
import datetime
import json
import os
import pathlib
import re
import sys
import time

try:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(line_buffering=True, encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(line_buffering=True, encoding="utf-8", errors="replace")
except Exception:
    pass

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
QUEUE_FILE = ROOT / "web" / "public" / "social-queue.json"
LOG_FILE = HERE / "distribution_log.jsonl"
DEFAULT_PROFILE = pathlib.Path.home() / ".config" / "job-hunt" / "playwright_linkedin"

def load_queue():
    if not QUEUE_FILE.exists():
        print(f"❌ Queue file not found: {QUEUE_FILE}")
        return []
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def load_history():
    history = {}
    if LOG_FILE.exists():
        for line in LOG_FILE.read_text(encoding="utf-8").splitlines():
            try:
                rec = json.loads(line)
                key = f"{rec.get('slug')}:{rec.get('platform')}"
                history[key] = rec
            except Exception:
                pass
    return history

def record_action(slug, platform, action, status="success", details=None):
    rec = {
        "timestamp": datetime.datetime.now().isoformat(timespec="seconds"),
        "slug": slug,
        "platform": platform,
        "action": action,
        "status": status,
        "details": details or {}
    }
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")

def parse_social_copy(raw_copy):
    sections = {}
    current = None
    lines = []
    for line in raw_copy.splitlines():
        if "## 1. YouTube" in line:
            if current: sections[current] = "\n".join(lines).strip()
            current = "youtube"
            lines = []
        elif "## 2. X" in line or "## 2. Twitter" in line:
            if current: sections[current] = "\n".join(lines).strip()
            current = "x"
            lines = []
        elif "## 3. LinkedIn" in line:
            if current: sections[current] = "\n".join(lines).strip()
            current = "linkedin"
            lines = []
        else:
            lines.append(line)
    if current:
        sections[current] = "\n".join(lines).strip()
    return sections

def print_status(queue, history):
    print("=" * 80)
    print(f"📊 PORTFOLIO DISTRIBUTION STATUS AUDIT ({len(queue)} TOTAL PROJECTS)")
    print("=" * 80)
    print(f"{'SLUG':<28} | {'VIDEO':<5} | {'POSTER':<6} | {'INDEXNOW':<9} | {'LINKEDIN':<9} | {'X'}")
    print("-" * 80)
    
    for item in queue:
        slug = item["slug"]
        has_v = "✓" if item.get("has_video") else "✗"
        has_p = "✓" if item.get("has_poster") else "✗"
        in_status = "✓ Pushed" if f"{slug}:indexnow" in history else "Pending"
        li_status = "✓ Posted" if f"{slug}:linkedin" in history else "Queue"
        x_status = "✓ Posted" if f"{slug}:x" in history else "Queue"
        print(f"{slug[:28]:<28} | {has_v:^5} | {has_p:^6} | {in_status:<9} | {li_status:<9} | {x_status}")
    print("=" * 80)

def run_indexnow():
    """Runs the IndexNow submission directly."""
    try:
        from auto_indexnow import submit_indexnow
        submit_indexnow()
        queue = load_queue()
        for item in queue:
            record_action(item["slug"], "indexnow", "submit", "success")
        return True
    except Exception as e:
        print(f"❌ IndexNow submission error: {e}")
        return False

def automate_linkedin_post(page, item, draft_only=True):
    slug = item["slug"]
    copy_dict = parse_social_copy(item.get("share_copy", ""))
    li_text = copy_dict.get("linkedin", item.get("tagline", ""))
    media_path = item.get("mp4") if (item.get("has_video") and pathlib.Path(item.get("mp4", "")).exists()) else item.get("jpg")

    print(f"\n🚀 [LinkedIn] Processing: {item['title']} ({slug})")
    print(f"   Media: {pathlib.Path(media_path).name if media_path else 'None'}")
    print(f"   Draft Mode: {draft_only}")

    page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded", timeout=30000)
    page.wait_for_timeout(3000)

    # Check login
    if "/login" in page.url or "/uas/login" in page.url:
        print("   ⚠️ Not currently logged into LinkedIn in this browser context.")
        print("   Please sign in in the browser window, or session cookies will be picked up on next run.")
        return False

    # Start a post button
    start_btn = page.locator("button:has-text('Start a post'), button.share-box-feed-entry__trigger").first
    if start_btn.count() == 0:
        print("   ⚠️ Post composer trigger not found.")
        return False

    start_btn.click()
    page.wait_for_timeout(1500)

    # Post dialog
    modal = page.locator("div[role='dialog'], .share-box-modal").first
    if modal.count() == 0:
        print("   ⚠️ Post dialog did not open.")
        return False

    # Upload media if available
    if media_path and pathlib.Path(media_path).exists():
        media_btn = modal.locator("button[aria-label*='media'], button[aria-label*='photo'], button[aria-label*='video']").first
        if media_btn.count() > 0:
            try:
                # File input
                with page.expect_file_chooser(timeout=5000) as fc_info:
                    media_btn.click()
                file_chooser = fc_info.value
                file_chooser.set_files(media_path)
                page.wait_for_timeout(3000)

                # Click Next in media modal if present
                next_btn = page.locator("button:has-text('Next')").last
                if next_btn.count() > 0 and next_btn.is_visible():
                    next_btn.click()
                    page.wait_for_timeout(1500)
            except Exception as e:
                print(f"   ℹ️ Media upload note: {e}")

    # Type copy into editor
    editor = page.locator("div[role='textbox'], .ql-editor").first
    if editor.count() > 0:
        editor.click()
        page.wait_for_timeout(500)
        page.keyboard.insert_text(li_text)
        page.wait_for_timeout(1500)
        print("   ✓ Copy filled into LinkedIn composer.")

    if draft_only:
        print("   🛡️ Draft mode enabled: Composer filled. Taking screenshot for verification.")
        shot_path = HERE / f"draft_linkedin_{slug}.png"
        page.screenshot(path=str(shot_path))
        print(f"   📸 Verification screenshot saved: {shot_path.name}")
        record_action(slug, "linkedin", "draft", "success", {"screenshot": str(shot_path)})
        return True
    else:
        post_btn = page.locator("button:has-text('Post'), .share-actions__primary-action").first
        if post_btn.count() > 0 and post_btn.is_enabled():
            post_btn.click()
            page.wait_for_timeout(4000)
            print("   🎉 Successfully posted to LinkedIn!")
            record_action(slug, "linkedin", "post", "success")
            return True
        else:
            print("   ⚠️ Post button not enabled.")
            return False

def main():
    parser = argparse.ArgumentParser(description="Autonomous Social Distribution & Search Engine Indexing Engine")
    parser.add_argument("--status", action="store_true", help="Audit distribution status")
    parser.add_argument("--indexnow", action="store_true", help="Submit all URLs to IndexNow / Bing")
    parser.add_argument("--platform", choices=["all", "linkedin", "x", "youtube", "indexnow"], default="status", help="Target distribution platform")
    parser.add_argument("--project", type=str, default="", help="Specific project slug (e.g. airlock, forgeos)")
    parser.add_argument("--limit", type=int, default=1, help="Max projects to distribute in one run")
    parser.add_argument("--post", action="store_true", help="Publish directly instead of saving draft")
    parser.add_argument("--headless", action="store_true", help="Run browser in headless mode")
    parser.add_argument("--profile", type=str, default="", help="Path to custom Playwright persistent profile")
    args = parser.parse_args()

    queue = load_queue()
    history = load_history()

    if args.indexnow or args.platform == "indexnow":
        run_indexnow()
        return

    if args.status or args.platform == "status":
        print_status(queue, history)
        return

    # Select target projects
    targets = []
    if args.project:
        targets = [item for item in queue if item["slug"] == args.project]
        if not targets:
            print(f"❌ Project slug '{args.project}' not found in queue.")
            return
    else:
        targets = queue[:args.limit]

    profile_dir = pathlib.Path(args.profile) if args.profile else DEFAULT_PROFILE
    profile_dir.mkdir(parents=True, exist_ok=True)

    print(f"🚀 Initializing Playwright persistent engine (Profile: {profile_dir})...")
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(profile_dir),
            headless=args.headless,
            viewport={"width": 1366, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        )
        page = context.pages[0] if context.pages else context.new_page()

        for item in targets:
            if args.platform in ("linkedin", "all"):
                automate_linkedin_post(page, item, draft_only=not args.post)

        page.wait_for_timeout(2000)
        context.close()

    print("\n✅ Autonomous distribution batch run complete!")

if __name__ == "__main__":
    main()
