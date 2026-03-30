# OWASP Security Skill

You are a cybersecurity expert. When this skill is active, audit and write code defensively following OWASP Top 10 and secure coding standards.

---

## OWASP Top 10 (2021) — Quick Reference

| # | Risk | What to check |
|---|------|---------------|
| A01 | Broken Access Control | Missing auth checks, IDOR, path traversal |
| A02 | Cryptographic Failures | Plain-text secrets, weak hashing, HTTP |
| A03 | Injection | SQL, XSS, command, LDAP, template injection |
| A04 | Insecure Design | Missing rate limits, no threat modeling |
| A05 | Security Misconfiguration | Default creds, verbose errors, open CORS |
| A06 | Vulnerable Components | Outdated deps with known CVEs |
| A07 | Auth & Session Failures | Weak passwords, long sessions, no MFA |
| A08 | Software & Data Integrity | Unverified packages, unsafe deserialization |
| A09 | Logging & Monitoring Failures | No audit logs, silent errors |
| A10 | SSRF | Unvalidated URLs fetched server-side |

---

## Input Validation Rules

**Always validate at the boundary (API routes, form handlers).**

```ts
// ✅ Good — Zod schema validation
import { z } from "zod";
const schema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(1).max(100).regex(/^[\w\s'-]+$/),
  message: z.string().min(1).max(2000),
});

// ✅ Sanitize before rendering untrusted HTML
import DOMPurify from "dompurify";
const safe = DOMPurify.sanitize(userInput);

// ❌ Never trust client-side validation alone
// ❌ Never pass raw input to shell commands, SQL, or eval()
```

**Rules:**
- Whitelist allowed characters, don't just blacklist bad ones
- Validate type, length, format, and range
- Reject and log unexpected input — don't silently strip
- Never use `innerHTML` with user content — use `textContent` or DOMPurify

---

## Injection Prevention

### XSS
```tsx
// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe — React escapes by default
<div>{userInput}</div>

// ✅ When HTML is needed
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### SQL Injection
```ts
// ❌ Never
db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ Always use parameterized queries / ORM
db.query("SELECT * FROM users WHERE email = $1", [email]);
// or with Drizzle ORM
await db.select().from(users).where(eq(users.email, email));
```

### Command Injection
```ts
// ❌ Never interpolate into shell commands
exec(`convert ${filename} output.png`);

// ✅ Use arrays — no shell interpolation
execFile("convert", [filename, "output.png"]);
```

---

## Authentication & Authorization

### Passwords
```ts
// ❌ Never store plain text or use MD5/SHA1
// ✅ Use bcrypt with cost factor ≥ 12
import bcrypt from "bcrypt";
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(input, hash);
```

### Sessions & JWT
```ts
// ✅ Secure cookie settings
res.cookie("session", token, {
  httpOnly: true,      // no JS access
  secure: true,        // HTTPS only
  sameSite: "strict",  // CSRF protection
  maxAge: 15 * 60 * 1000, // 15 min expiry
});

// ✅ Short-lived JWT, strong secret from env
const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
// ❌ Never put sensitive data in payload (base64, not encrypted)
// ❌ Never hardcode the secret
```

### Authorization — Prevent IDOR
```ts
// ✅ Check ownership on every resource request
const resource = await db.find(id);
if (resource.userId !== req.user.id) {
  return res.status(403).json({ error: "Forbidden" });
}

// ✅ Route-level auth middleware
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}
```

---

## API Security

### Rate Limiting
```ts
import rateLimit from "express-rate-limit";

// General API limit
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Stricter for auth endpoints
app.use("/api/auth/", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
```

### CORS
```ts
// ✅ Restrict to known origins
app.use(cors({
  origin: ["https://yourdomain.com"],
  methods: ["GET", "POST"],
  credentials: true,
}));

// ❌ Never combine origin: "*" with credentials: true
```

### Security Headers
```ts
import helmet from "helmet";
app.use(helmet()); // X-Frame-Options, CSP, HSTS, X-Content-Type-Options, etc.
```

### Error Responses — Don't Leak Internals
```ts
// ❌ Leaks stack trace
res.status(500).json({ error: err.message, stack: err.stack });

// ✅ Generic client message, full detail in server logs
console.error("[Error]", err);
res.status(500).json({ error: "Internal server error" });
```

---

## Sensitive Data & Secrets

```ts
// ❌ Never hardcode
const apiKey = "sk-live-abc123";

// ✅ Always use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY env var is required");
```

**.gitignore must include:**
```
.env
.env.local
*.pem
*.key
secrets/
```

**Never commit:** API keys, tokens, passwords, private keys, DB connection strings.

> `VITE_*` env vars are bundled into the client — **never put secrets in them**. Use server-side env vars for API keys.

---

## CSRF Protection

```ts
// SameSite=strict cookies block CSRF automatically.
// For APIs consumed by third parties, validate Origin header:
const ALLOWED_ORIGINS = ["https://yourdomain.com"];
app.use((req, res, next) => {
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    const origin = req.headers.origin;
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return res.status(403).json({ error: "Forbidden" });
    }
  }
  next();
});
```

---

## SSRF Prevention

```ts
// ❌ Never fetch user-supplied URLs without validation
const data = await fetch(req.body.url);

// ✅ Whitelist allowed domains
const ALLOWED_HOSTS = ["api.github.com", "api.stripe.com"];
const url = new URL(req.body.url);
if (!ALLOWED_HOSTS.includes(url.hostname)) {
  return res.status(400).json({ error: "URL not allowed" });
}
```

---

## Dependency Security

```bash
npm audit          # find known vulnerabilities
npm audit fix      # auto-fix safe upgrades
npx snyk test      # deeper CVE scan
```

- Pin major versions in production
- Review changelogs before upgrading
- Remove unused packages

---

## Logging & Monitoring

```ts
// ✅ Log security events — never log sensitive values
console.log(`[AUTH] Failed login ip=${req.ip} time=${Date.now()}`);
console.log(`[ACCESS] Denied: resource=${resourceId} user=${userId}`);

// ❌ Never log
console.log(`Password: ${password}`);
console.log(`Token: ${jwt}`);
```

**What to log:** auth success/failure, access denied, input validation failures, unusual patterns, admin actions.

---

## Security Checklist (before every PR)

- [ ] All inputs validated server-side (Zod or equivalent)
- [ ] No raw SQL string interpolation
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] Auth + ownership checks on every protected route/resource
- [ ] No secrets in source code or git history
- [ ] Error messages don't expose internals to the client
- [ ] Dependencies audited (`npm audit`)
- [ ] Rate limiting on auth and sensitive endpoints
- [ ] CORS restricted to known origins
- [ ] Cookies: `httpOnly`, `secure`, `sameSite`
- [ ] HTTPS enforced in production
- [ ] Security headers set via Helmet

---

## This Project — Specific Notes

| Area | Risk | Recommendation |
|------|------|----------------|
| Contact form (`/api/contact`) | No server-side rate limit | Add `express-rate-limit` on this route |
| ChatBot webhook (`VITE_N8N_WEBHOOK_URL`) | URL exposed in client bundle | Proxy through `/api/chat` so the URL stays server-side |
| `VITE_*` env vars | Visible in browser bundle | Never store API keys here; use server env vars |
| `attached_assets/` | Publicly served PDFs/XLSXs | Confirm no confidential data; access logs recommended |
| Error handler (`server/index.ts`) | Already fixed — no stack leak | Keep `err.message` out of client responses |
| Static files | No auth | Intentional for portfolio; ensure no sensitive files land in `client/public/` |
