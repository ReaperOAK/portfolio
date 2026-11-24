#!/usr/bin/env python3
"""Autonomous IndexNow Search Engine Submission Engine.

Submits all 52 production URLs (homepage + all 44 case studies + sitemap)
directly to Microsoft Bing, Yandex, Naver, and Seznam via the IndexNow API.
"""

import json
import pathlib
import sys
import urllib.request
import urllib.error

INDEXNOW_KEY = "e3d4891b945447b9bf049a4f4efb2b71"
HOST = "portfolio.owaiskhan.website"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

PROJECTS_DIR = pathlib.Path(__file__).resolve().parent.parent / "web" / "content" / "projects"

def get_all_urls():
    urls = [
        f"https://{HOST}/",
        f"https://{HOST}/sitemap.xml",
        f"https://{HOST}/llms.txt",
        f"https://{HOST}/llms-full.txt",
    ]
    if PROJECTS_DIR.exists():
        for f in sorted(PROJECTS_DIR.glob("*.mdx")):
            slug = f.stem
            urls.append(f"https://{HOST}/work/{slug}")
    return urls

def submit_indexnow():
    urls = get_all_urls()
    print(f"============================================================")
    print(f"🚀 Submitting {len(urls)} URLs to IndexNow (Bing, Yandex, Seznam)...")
    print(f"============================================================")

    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }
    data = json.dumps(payload, indent=2).encode("utf-8")

    endpoints = [
        ("IndexNow Central", "https://api.indexnow.org/indexnow"),
        ("Microsoft Bing", "https://www.bing.com/indexnow")
    ]

    for name, endpoint in endpoints:
        print(f"\n📡 Pinging {name} ({endpoint})...")
        req = urllib.request.Request(
            endpoint,
            data=data,
            headers={
                "Content-Type": "application/json; charset=utf-8",
                "User-Agent": "IndexNow-AutoSubmitter/1.0 (+https://portfolio.owaiskhan.website)"
            },
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                status = resp.status
                body = resp.read().decode("utf-8", errors="replace")
                print(f"   ✅ Response: HTTP {status} (OK / Accepted)")
                if body:
                    print(f"   Response Body: {body[:200]}")
        except urllib.error.HTTPError as e:
            # 202 is treated as success by IndexNow specification
            if e.code in (200, 202):
                print(f"   ✅ Response: HTTP {e.code} (Accepted for crawling)")
            else:
                body = e.read().decode("utf-8", errors="replace")
                print(f"   ⚠️ HTTP {e.code}: {body}")
        except Exception as e:
            print(f"   ❌ Network error: {e}")

    print("\n🎯 IndexNow submission complete!")

if __name__ == "__main__":
    submit_indexnow()
