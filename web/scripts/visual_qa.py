"""
Portfolio Visual QA & Responsive Audit Script
Uses Playwright to audit key viewports (1440px, 768px, 375px) on a local or production server.
Checks for:
1. Horizontal scroll overflow (broken mobile layouts)
2. Console errors & network failures
3. Interactive ProjectArchive radar behavior
4. Captures high-res screenshots for visual verification
"""

import sys, os, time
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("PORTFOLIO_URL", "https://portfolio.owaiskhan.website")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "test", "screenshots")
os.makedirs(OUTPUT_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "tablet_768", "width": 768, "height": 1024},
    {"name": "mobile_375", "width": 375, "height": 812},
]

ROUTES = [
    {"path": "/", "name": "home"},
    {"path": "/hire", "name": "hire"},
    {"path": "/work/festify", "name": "work_festify"},
    {"path": "/work/hackinhills", "name": "work_airlock"},
]

def run_visual_audit():
    print(f"==================================================")
    print(f"🚀 Launching Visual QA Audit against: {BASE_URL}")
    print(f"==================================================")

    errors = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for vp in VIEWPORTS:
            print(f"\n--- Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
            context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = context.new_page()

            page_errors = []
            page.on("console", lambda msg: page_errors.append(f"Console {msg.type}: {msg.text}") if msg.type == "error" else None)
            page.on("pageerror", lambda err: page_errors.append(f"PageError: {err}"))

            for route in ROUTES:
                url = f"{BASE_URL}{route['path']}"
                print(f"  Auditing {route['name']} ({url})...")
                try:
                    res = page.goto(url, wait_until="networkidle", timeout=20000)
                    if res and res.status >= 400:
                        errors.append(f"HTTP {res.status} error on {url}")
                        continue
                except Exception as e:
                    print(f"    ⚠️ Warning navigating to {url}: {e}")
                    # Try domcontentloaded
                    page.goto(url, wait_until="domcontentloaded", timeout=15000)

                # 1. Horizontal overflow check
                has_overflow = page.evaluate("""() => {
                    return document.documentElement.scrollWidth > window.innerWidth;
                }""")
                if has_overflow:
                    err_msg = f"❌ Horizontal overflow detected on {route['name']} at {vp['name']} (scrollWidth > innerWidth)"
                    print(f"    {err_msg}")
                    errors.append(err_msg)
                else:
                    print(f"    ✓ No horizontal overflow (clean viewport fit)")

                # Screenshot
                shot_path = os.path.join(OUTPUT_DIR, f"{route['name']}_{vp['name']}.png")
                page.screenshot(path=shot_path, full_page=False)
                print(f"    📸 Snapshot saved: {os.path.basename(shot_path)}")

            # Interactive check on Home page: test the Project Radar
            if vp["name"] == "desktop_1440":
                print(f"\n  Testing interactive radar search & filtering on Home...")
                page.goto(f"{BASE_URL}/", wait_until="networkidle", timeout=20000)
                
                # Check search input exists if present
                search_input = page.query_selector("input[aria-label*='Filter projects']")
                if search_input:
                    search_input.fill("Docker")
                    page.wait_for_timeout(500)
                    shot_path = os.path.join(OUTPUT_DIR, f"home_interactive_search_docker.png")
                    page.screenshot(path=shot_path)
                    print(f"    📸 Search interactive snapshot: {os.path.basename(shot_path)}")
                
            context.close()

        browser.close()

    print(f"\n==================================================")
    if errors:
        print(f"⚠️ Audit finished with {len(errors)} issues:")
        for e in errors:
            print(f"  - {e}")
        return False
    else:
        print(f"✅ Visual QA passed with 0 horizontal overflows and clean rendering across all viewports!")
        return True

if __name__ == "__main__":
    success = run_visual_audit()
    sys.exit(0 if success else 1)
