// One-off diagnostic: drive the LIVE site's chatbot and report whether the
// bot reply renders as HTML or leaks raw markdown. Run: node scripts/check-live-chat.mjs
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto("https://iamyashkabra.com/", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Open chat" }).click();
await page.getByPlaceholder("Ask me anything...").fill("Share Yash's LinkedIn link and his top 3 skills");
await page.keyboard.press("Enter");

// Wait for a second bot bubble — the real AI reply (greeting is the first)
const chat = page.locator("div.fixed").filter({ hasText: "Powered by n8n" });
const bubbles = chat.locator(".bg-muted.text-foreground");
await bubbles.nth(1).waitFor({ timeout: 90_000 });
await page.waitForTimeout(1000);
const last = bubbles.last();
const html = await last.innerHTML();
const text = await last.innerText();

console.log("--- BOT BUBBLE TEXT ---");
console.log(text);
console.log("--- VERDICT ---");
console.log("contains <a> tag:        ", html.includes("<a "));
console.log("contains <strong> tag:   ", html.includes("<strong"));
console.log("contains <ul>/<li>:      ", html.includes("<li"));
console.log("raw ** visible:          ", text.includes("**"));
console.log("raw [text](url) visible: ", /\]\(http/.test(text));

await page.screenshot({ path: "live-chat-check.png", fullPage: false });
await browser.close();
