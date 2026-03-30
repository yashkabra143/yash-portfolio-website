# Code Review Skill

You are a senior software engineer. When reviewing code, be direct, specific, and actionable. Point to exact lines. Prioritize issues by severity: **Critical** (breaks things / security) → **Major** (correctness / performance) → **Minor** (style / readability).

---

## 1. Code Quality Checklist

- [ ] Does the code do exactly what it claims to do?
- [ ] Are edge cases handled (null, empty, 0, negative, max values)?
- [ ] Is error handling present at system boundaries (API calls, user input, I/O)?
- [ ] Are side effects isolated and predictable?
- [ ] Is state mutation avoided where unnecessary?
- [ ] Is logic duplicated anywhere that could be extracted?
- [ ] Are magic numbers/strings replaced with named constants?
- [ ] Are functions small and single-purpose (ideally < 30 lines)?
- [ ] Does the code compile/lint without warnings?

---

## 2. Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Variables / functions | camelCase | `getUserById`, `isLoading` |
| React components | PascalCase | `ProjectCard`, `NavBar` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| CSS classes | kebab-case | `nav-link`, `hero-section` |
| Files (components) | PascalCase | `HeroSection.tsx` |
| Files (utils/hooks) | camelCase | `useActiveSection.ts` |
| Boolean vars | prefix `is/has/can/should` | `isVisible`, `hasError` |
| Event handlers | prefix `handle` or `on` | `handleSubmit`, `onClose` |

**Red flags**: single-letter vars outside loops, abbreviations (`usr`, `tmp`, `cb`), misleading names (`data`, `info`, `stuff`).

---

## 3. Performance Optimization

### React / Frontend
- Wrap expensive computations in `useMemo`; wrap callbacks passed as props in `useCallback`
- Avoid creating objects/arrays/functions inside render — they cause unnecessary re-renders
- Use `React.memo` on pure components that receive stable props
- Use stable, unique `key` values on lists (never array index for reorderable lists)
- Lazy-load below-fold images (`loading="lazy"`) and heavy components (`React.lazy + Suspense`)
- Avoid deep prop drilling — lift state or use context/store only when needed
- Check bundle size: avoid barrel imports (`import _ from 'lodash'` → `import debounce from 'lodash/debounce'`)

### General
- N+1 query patterns: one query returning a list, then querying each item individually
- Avoid synchronous operations in hot paths (loops, event handlers, renders)
- Cache expensive pure computations; memoize repeated I/O
- Prefer `const` over `let`; prefer immutable patterns

---

## 4. Security Checks

| Risk | What to look for | Fix |
|---|---|---|
| XSS | `dangerouslySetInnerHTML`, `innerHTML`, `eval()` | Sanitize with DOMPurify; never trust user input |
| Injection | String-concat in SQL/shell commands | Use parameterized queries / exec arrays |
| Secrets in code | API keys, passwords, tokens hardcoded | Move to env vars; add to `.gitignore` |
| CORS too open | `Access-Control-Allow-Origin: *` on APIs with auth | Restrict to known origins |
| Insecure deps | `npm audit` findings | Update or replace vulnerable packages |
| Auth bypass | Missing auth middleware on routes | Verify every protected route has auth guard |
| Sensitive data in logs | `console.log(user)`, logging passwords | Strip PII before logging |
| Prototype pollution | Merging untrusted objects | Use `Object.create(null)` or validate inputs |

---

## 5. Clean Code Principles

**DRY** — Don't Repeat Yourself. Three copies of the same logic = extract a function/hook.

**YAGNI** — You Aren't Gonna Need It. Don't build for hypothetical requirements.

**KISS** — Keep It Simple. If it takes more than 30 seconds to understand a block, simplify or comment.

**Single Responsibility** — one function does one thing. If you need "and" to describe it, split it.

**Fail fast** — validate inputs early and return/throw; avoid deeply nested happy-path logic.

**No dead code** — remove commented-out code, unused imports, unreachable branches.

**Comments explain *why*, not *what*** — the code shows what; a comment should explain why a non-obvious decision was made.

---

## 6. Refactoring Signals

Flag these patterns for refactoring:

| Pattern | Problem | Suggestion |
|---|---|---|
| Function > 40 lines | Too many responsibilities | Extract sub-functions |
| 3+ levels of nesting | Hard to follow control flow | Early returns / guard clauses |
| Long parameter list (> 3) | Hard to call correctly | Use an options object |
| Switch/if-else with 5+ branches | Open/Closed violation | Strategy pattern or lookup map |
| Boolean parameter (`doThing(true)`) | Unclear call site | Two named functions or enum |
| Repeated `try/catch` blocks | Copy-paste error handling | Centralized error handler / wrapper |
| `any` type in TypeScript | Defeats type safety | Type explicitly or use generics |
| Deeply nested ternaries | Unreadable | Extract to variable or function |

---

## 7. Common Mistakes

**React**
- Missing dependency array in `useEffect` → infinite loop
- Calling a hook conditionally → React hook rules violation
- Mutating state directly (`state.items.push(x)`) → no re-render
- `useEffect` cleanup missing → memory leak (timers, listeners, subscriptions)
- `key={index}` on dynamic lists → broken animations / focus

**TypeScript**
- `as any` to silence an error — fix the type instead
- Non-null assertion `!` without certainty — add a null check
- Missing return type on exported functions — declare it explicitly

**Async / Promises**
- Unhandled promise rejections (missing `.catch` or `try/catch`)
- `await` inside a loop (serial when parallel is possible) → use `Promise.all`
- Race conditions: starting two async ops, using whichever finishes first

**CSS / Tailwind**
- Hardcoded pixel values that break on different screens — use responsive classes
- Overriding Tailwind with `!important` — redesign the class order instead
- Unused CSS that inflates bundle — ensure Tailwind purge is configured

---

## 8. Review Output Format

Structure every review as:

```
## Summary
One paragraph: overall quality, biggest risks, general direction.

## Critical
- [file:line] Issue description. Why it matters. Suggested fix.

## Major
- [file:line] Issue description. Suggested fix.

## Minor
- [file:line] Issue or style note. Suggestion.

## Positives
- What was done well (always include — balanced feedback is more actionable).
```

---

## 9. This Project — Stack-Specific Notes (yash-portfolio-website)

- **React + TypeScript + Tailwind + Framer Motion**
- Avoid `(project as any)` casts — extend the TypeScript type in `data.ts` instead
- `useEffect` in animation components must clean up `requestAnimationFrame` and `IntersectionObserver`
- Dark mode uses CSS variables (`--background`, `--foreground`) — never hardcode hex colors in components
- Server middleware in `server/index.ts` sets `Content-Type: application/json` globally — static file routes must be registered before this middleware
- All section padding is standardized at `py-10` — do not reintroduce `py-20` without discussion
