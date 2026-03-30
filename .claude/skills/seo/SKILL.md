# SEO Skill

You are an SEO expert. Apply these rules when optimizing any website for Google ranking.

---

## 1. Keyword Strategy

- **Primary keyword**: one main term per page (e.g., "QA Engineer portfolio")
- **Secondary keywords**: 3–5 related terms (e.g., "test automation specialist", "Selenium Python engineer")
- **Long-tail keywords**: conversational phrases (e.g., "QA engineer with Selenium and Python experience")
- Place primary keyword in: `<title>`, `<h1>`, first 100 words of body, meta description, URL slug
- Avoid keyword stuffing — density ~1–2% max
- Use synonyms and LSI (latent semantic indexing) keywords naturally

---

## 2. On-Page SEO Checklist

- [ ] `<title>` tag: 50–60 chars, includes primary keyword near the front
- [ ] Meta description: 150–160 chars, compelling, includes keyword + CTA
- [ ] One `<h1>` per page — contains primary keyword
- [ ] Subheadings (`<h2>`–`<h3>`) use secondary keywords
- [ ] First paragraph mentions primary keyword
- [ ] All images have descriptive `alt` attributes
- [ ] Internal links use descriptive anchor text (not "click here")
- [ ] Canonical tag set (`<link rel="canonical" href="...">`)
- [ ] `lang` attribute on `<html>` tag
- [ ] No duplicate content across pages
- [ ] Structured data / JSON-LD (Person, WebSite, BreadcrumbList)

---

## 3. Meta Tags Structure

```html
<!-- Core -->
<title>Primary Keyword - Brand Name</title>
<meta name="description" content="150–160 char description with keyword and CTA.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://domain.com/page/">

<!-- Open Graph (Facebook / LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Same as <title>">
<meta property="og:description" content="Same as meta description">
<meta property="og:image" content="https://domain.com/og-image.jpg"> <!-- 1200×630px -->
<meta property="og:url" content="https://domain.com/page/">
<meta property="og:site_name" content="Brand Name">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Same as <title>">
<meta name="twitter:description" content="Same as meta description">
<meta name="twitter:image" content="https://domain.com/og-image.jpg">
<meta name="twitter:site" content="@handle">
```

---

## 4. Heading Hierarchy (H1–H6)

```
H1  → Page title / primary keyword (one per page)
  H2  → Major section (Skills, Experience, Projects)
    H3  → Sub-section (individual items within a section)
      H4  → Minor details (rarely needed)
```

Rules:
- Never skip levels (don't jump H1 → H3)
- Don't use headings just for styling — use CSS instead
- Screen readers and crawlers both rely on this structure

---

## 5. Internal Linking Strategy

- Every section/page should be reachable within 2 clicks from the home page
- Use descriptive anchor text that matches the destination's H1
- Link from high-authority pages to pages that need ranking boosts
- For SPAs: ensure anchor links (`#section`) are crawlable or implement proper routing
- Add a sitemap (`/sitemap.xml`) and reference it in `robots.txt`

---

## 6. Page Speed Optimization

- **Images**: use WebP/AVIF, lazy-load below-fold images (`loading="lazy"`), serve correct sizes
- **Fonts**: `font-display: swap`, preload critical font files, limit font variants
- **JS**: code-split, defer non-critical scripts, avoid render-blocking resources
- **CSS**: purge unused CSS (e.g., with PurgeCSS/Tailwind's built-in purge)
- **Caching**: set `Cache-Control` headers; use CDN for static assets
- **Core Web Vitals targets**:
  - LCP (Largest Contentful Paint) < 2.5s
  - INP (Interaction to Next Paint) < 200ms
  - CLS (Cumulative Layout Shift) < 0.1
- Test with: Google PageSpeed Insights, Lighthouse, WebPageTest

---

## 7. Structured Data (JSON-LD)

For a personal portfolio, add `Person` schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Full Name",
  "jobTitle": "Job Title",
  "url": "https://domain.com",
  "sameAs": [
    "https://linkedin.com/in/handle",
    "https://github.com/handle"
  ],
  "image": "https://domain.com/photo.jpg",
  "description": "Brief professional description"
}
</script>
```

---

## 8. Common SEO Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Missing or duplicate `<title>` / meta desc | Unique per page, within char limits |
| Multiple `<h1>` tags | One H1 per page only |
| Images without `alt` text | Descriptive alt on every image |
| No canonical tag | Add `<link rel="canonical">` |
| Thin content (< 300 words) | Expand or consolidate pages |
| Broken internal links | Audit with Screaming Frog or browser devtools |
| No HTTPS | Mandatory — Google demotes HTTP sites |
| Blocking CSS/JS in robots.txt | Allow crawlers to render your page fully |
| Missing Open Graph image | Add 1200×630px OG image |
| No sitemap | Generate and submit to Google Search Console |

---

## 9. Portfolio-Specific Tips

- Target: `"[Name] QA Engineer"`, `"[Name] test automation"`, `"[Name] portfolio"`
- Include city/region for local job searches: `"QA Engineer Dallas TX"`
- Add `<link rel="me">` pointing to LinkedIn/GitHub for E-E-A-T signals
- Update `last-modified` dates on project entries to signal fresh content
- Ensure the resume/CV PDF is linked and has a keyword-rich filename (e.g., `yash-kabra-qa-engineer-resume.pdf`)
