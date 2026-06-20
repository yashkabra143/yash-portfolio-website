import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title and hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Yash Kabra/);
    await expect(page.getByText("Yash Kabra", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Senior Quality Assurance Engineer").first()).toBeVisible();
  });

  test("serves robots.txt and sitemap.xml", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<urlset");
  });

  test("has SEO essentials", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.iamyashkabra.com/"
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /Yash Kabra/
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /QA Engineer/
    );
  });

  test("renders all main sections", async ({ page }) => {
    await page.goto("/");
    for (const id of ["education", "experience", "skills", "projects", "contact"]) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
  });

  test("hero social links point to the right profiles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /linkedin/i }).first()).toHaveAttribute(
      "href",
      /linkedin\.com/
    );
    await expect(page.getByRole("link", { name: /github/i }).first()).toHaveAttribute(
      "href",
      /github\.com/
    );
  });
});

test.describe("Theme", () => {
  test("toggle switches between light and dark mode", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: "Toggle theme" }).first();

    const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
    await toggle.click();
    if (wasDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });
});

test.describe("Contact form", () => {
  test("shows validation errors on empty submit and does not call the API", async ({ page }) => {
    await page.goto("/");

    let apiCalled = false;
    await page.route("**/api/contact", (route) => {
      apiCalled = true;
      return route.fulfill({ status: 201, json: { success: true } });
    });

    const submit = page.getByRole("button", { name: /send message/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();

    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
    await expect(page.getByText("Subject must be at least 5 characters")).toBeVisible();
    await expect(page.getByText("Message must be at least 10 characters")).toBeVisible();
    expect(apiCalled).toBe(false);
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.goto("/");

    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 201,
        json: { success: true, message: "Message received successfully" },
      })
    );

    const contact = page.locator("section#contact");
    await contact.scrollIntoViewIfNeeded();

    await page.getByLabel("Name *").fill("Playwright Bot");
    await page.getByLabel("Email *").fill("playwright@example.com");
    await page.getByLabel("Subject *").fill("Automated E2E test");
    await page
      .getByLabel("Message *")
      .fill("This message was sent by the automated Playwright suite.");

    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/thank you for your message/i)).toBeVisible();
  });
});

test.describe("ChatBot", () => {
  test("opens, greets, and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open chat" }).click();
    await expect(page.getByText(/Yash's AI assistant/i)).toBeVisible();
    await page.getByRole("button", { name: "Close chat" }).click();
    await expect(page.getByText(/Yash's AI assistant/i)).toBeHidden();
  });

  test("renders markdown in bot replies as formatted HTML", async ({ page }) => {
    // Real response shape captured from the production n8n webhook
    await page.route("**/webhook/**", (route) =>
      route.fulfill({
        status: 200,
        json: {
          output:
            "Connect with him on [LinkedIn](https://www.linkedin.com/in/yashkabra143/).\n\nYash's top skills are:\n* **Python**\n* **Selenium**\n* **API Testing**",
        },
      })
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Open chat" }).click();
    await page.getByPlaceholder("Ask me anything...").fill("Share LinkedIn and top skills");
    await page.keyboard.press("Enter");

    // Scope to the chat window so hero/footer LinkedIn links don't match
    const chat = page.locator("div.fixed").filter({ hasText: "Powered by n8n" });

    const link = chat.getByRole("link", { name: "LinkedIn" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/yashkabra143/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);

    await expect(chat.locator("li strong", { hasText: "Python" })).toBeVisible();
    await expect(chat.locator("ul li")).toHaveCount(3);

    // No raw markdown syntax leaks into the visible chat
    await expect(chat).not.toContainText("**");
    await expect(chat).not.toContainText("](");
  });

  test("user messages are shown as plain text, never parsed", async ({ page }) => {
    await page.route("**/webhook/**", (route) =>
      route.fulfill({ status: 200, json: { output: "Got it!" } })
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Open chat" }).click();
    await page
      .getByPlaceholder("Ask me anything...")
      .fill("**not bold** <img src=x onerror=alert(1)> [no link](https://evil.example)");
    await page.keyboard.press("Enter");

    // Literal markdown/HTML stays literal in the user bubble
    await expect(
      page.getByText("**not bold** <img src=x onerror=alert(1)> [no link](https://evil.example)")
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "no link" })).toHaveCount(0);
  });
});

test.describe("Accessibility basics", () => {
  test("skip-to-content link targets main content", async ({ page }) => {
    await page.goto("/");
    const skip = page.locator('a[href="#main"]');
    await expect(skip).toHaveCount(1);
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      expect(await images.nth(i).getAttribute("alt")).toBeTruthy();
    }
  });
});
