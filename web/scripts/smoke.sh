#!/usr/bin/env bash
# Post-deploy smoke check: every route and a static asset must answer 200. Catches deploy-only breakage
# (e.g. .vercelignore dropping web/public) that the unit tests cannot see.
# Usage: scripts/smoke.sh [base-url]   default: https://portfolio.owaiskhan.website
set -uo pipefail
BASE=${1:-https://portfolio.owaiskhan.website}
fail=0
for p in / /hire /soul /work/ticketvault /work/genai-media-platform /robots.txt /sitemap.xml \
         /cold-open/helmet-desk.webp "/_next/image?url=%2Fcold-open%2Fhelmet-desk.webp&w=640&q=75"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE$p")
  [ "$code" = 200 ] || { echo "FAIL $code $p"; fail=1; }
done
terms=$(cat "$(dirname "$0")/../../.githooks/nda-terms")
for p in / /hire /soul; do curl -s "$BASE$p" | grep -qiE "$terms" && { echo "FAIL NDA term on $p"; fail=1; }; done
[ $fail = 0 ] && echo "smoke: ok ($BASE)"
exit $fail
