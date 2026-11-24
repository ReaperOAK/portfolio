#!/usr/bin/env python3
"""
Social Media Launch Publisher & Queue Manager
Prepares, formats, and exports all 44 project launch videos and copy for
YouTube Shorts, X (Twitter), and LinkedIn.
"""

import os, sys, glob, json, argparse

PORTFOLIO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIA_DIR = os.path.join(PORTFOLIO_ROOT, "web", "public", "media", "brags")
PROJECTS_DIR = os.path.join(PORTFOLIO_ROOT, "web", "content", "projects")
STAGING_DIR = os.path.join(PORTFOLIO_ROOT, "brags-staging")

def load_projects_catalog():
    mdx_files = sorted(glob.glob(os.path.join(PROJECTS_DIR, "*.mdx")))
    catalog = []
    for m in mdx_files:
        slug = os.path.splitext(os.path.basename(m))[0]
        with open(m, "r", encoding="utf-8") as f:
            txt = f.read()

        title, tagline = slug, ""
        for line in txt.splitlines():
            if line.startswith("title:"):
                title = line.replace("title:", "").strip().strip('"').strip("'")
            elif line.startswith("tagline:"):
                tagline = line.replace("tagline:", "").strip().strip('"').strip("'")

        mp4_path = os.path.join(MEDIA_DIR, f"{slug}.mp4")
        jpg_path = os.path.join(MEDIA_DIR, f"{slug}.jpg")

        share_txt_path = os.path.join(STAGING_DIR, slug, "share-copy.txt")
        share_copy = ""
        if os.path.exists(share_txt_path):
            with open(share_txt_path, "r", encoding="utf-8") as sf:
                share_copy = sf.read()

        catalog.append({
            "slug": slug,
            "title": title,
            "tagline": tagline,
            "mp4": mp4_path,
            "jpg": jpg_path,
            "video_url": f"https://portfolio.owaiskhan.website/media/brags/{slug}.mp4",
            "case_study_url": f"https://portfolio.owaiskhan.website/work/{slug}",
            "share_copy": share_copy,
            "has_video": os.path.exists(mp4_path),
            "has_poster": os.path.exists(jpg_path),
        })
    return catalog

def main():
    parser = argparse.ArgumentParser(description="Manage social publication queue for 44 portfolio projects")
    parser.add_argument("--list", action="store_true", help="List all available launch projects")
    parser.add_argument("--slug", type=str, help="Get social copy and paths for a specific project")
    parser.add_argument("--export-json", type=str, help="Export entire social publishing queue to JSON file")
    args = parser.parse_args()

    catalog = load_projects_catalog()

    if args.list:
        print(f"\n==================================================================")
        print(f"🎬 Portfolio Launch Video Queue: {len(catalog)} Projects Ready")
        print(f"==================================================================")
        for i, p in enumerate(catalog, 1):
            status = "✓ Ready" if p["has_video"] and p["has_poster"] else "⚠️ Missing Media"
            print(f"[{i:02d}] {p['title']:<38} | {status} | /work/{p['slug']}")
        return

    if args.slug:
        match = next((p for p in catalog if p["slug"] == args.slug), None)
        if not match:
            print(f"Error: Project '{args.slug}' not found.")
            return
        print(f"\n==================================================================")
        print(f"Project: {match['title']} ({match['slug']})")
        print(f"Video: {match['mp4']}")
        print(f"Live URL: {match['case_study_url']}")
        print(f"==================================================================")
        print("\n--- Share Copy ---")
        print(match["share_copy"] if match["share_copy"] else "No share-copy.txt found.")
        return

    if args.export_json:
        with open(args.export_json, "w", encoding="utf-8") as jf:
            json.dump(catalog, jf, indent=2)
        print(f"Exported {len(catalog)} projects to {args.export_json}")
        return

    parser.print_help()

if __name__ == "__main__":
    main()
