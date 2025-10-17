import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(f"file://{os.path.abspath('resume.html')}")
        await expect(page.locator(".resume-photo")).to_be_visible()
        await page.screenshot(path="jules-scratch/verification/resume_page.png")
        await browser.close()

if __name__ == "__main__":
    import os
    asyncio.run(main())