@echo off
title Portfolio Autonomous Distribution & Indexing Engine
echo =====================================================================
echo  Portfolio Autonomous Distribution & Indexing Engine
echo  (Instant IndexNow Engine & Social Media Publisher)
echo =====================================================================
cd /d "c:\Users\ReaperOAK\projects\ReaperOAK\portfolio"

echo.
echo [1/2] Submitting 52 Production URLs to Microsoft Bing and IndexNow...
python scripts/auto_distribute.py --indexnow

echo.
echo [2/2] Displaying Distribution Status Audit...
python scripts/auto_distribute.py --status

echo.
echo =====================================================================
echo All search engines notified! Launch videos, posters and copy are ready.
echo To run Playwright distribution on LinkedIn:
echo   python scripts/auto_distribute.py --platform linkedin --limit 1
echo =====================================================================
pause
