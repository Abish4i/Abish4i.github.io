import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # Verify index.html
        page = await browser.new_page()
        await page.goto(f"file://{os.path.abspath('index.html')}")
        await expect(page).to_have_title("Abhishek Sengar — Portfolio")
        await expect(page.locator("h1")).to_contain_text("Abhishek Sengar")
        await expect(page.locator(".logo h1")).to_contain_text("Abhishek Sengar")
        await page.screenshot(path="jules-scratch/verification/index_final.png")

        # Verify resume.html
        await page.goto(f"file://{os.path.abspath('resume.html')}")
        await expect(page).to_have_title("Abhishek Sengar — Resume")
        await expect(page.locator(".logo h1")).to_contain_text("Abhishek Sengar")
        await expect(page.locator(".resume-header-text h1")).to_contain_text("Abhishek Sengar")
        await expect(page.locator("footer")).to_have_text("By Abhishek © 1998 Love Live Life")
        await expect(page.locator(".resume-photo")).to_be_visible()
        await page.screenshot(path="jules-scratch/verification/resume_page_final.png")

        await browser.close()

if __name__ == "__main__":
    import os
    asyncio.run(main())