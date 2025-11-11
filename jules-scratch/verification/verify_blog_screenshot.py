
import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the local blog.html file
        await page.goto(f"file://{os.path.abspath('blog.html')}")

        # Wait for the blog posts to be loaded
        await page.wait_for_selector('.project.card')

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/blog_screenshot.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
