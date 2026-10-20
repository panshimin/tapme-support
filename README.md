# TapMe: Number Merge — Support & Privacy

Static support and privacy-policy pages for the iPhone game **TapMe: Number Merge**, published with GitHub Pages.

Live site: https://panshimin.github.io/tapme-support/

| Page | English | 简体中文 |
| --- | --- | --- |
| Privacy policy | `/en/privacy/` | `/zh/privacy/` |
| Support | `/en/support/` | `/zh/support/` |
| Terms of use | `/en/terms/` | `/zh/terms/` |

## Layout

- `content.mjs` — privacy and support copy (English and Simplified Chinese).
- `terms.mjs` — terms-of-use copy.
- `contact.json` — `siteUrl`, `publisher`, `supportEmail`, `policyDate`, `termsDate`. Only approved public details go here.
- `build.mjs` — generates `dist/` from the copy and contact details. Refuses to build when contact details are missing; use `--draft` for a local preview.
- `check.mjs` — fetches the published pages and verifies status, titles, publisher, and the support email link.
- `.github/workflows/pages.yml` — builds and deploys `dist/` on every push to `main`.

## Commands

```bash
npm run build          # generate dist/
npm run serve          # preview at http://127.0.0.1:8765/
npm run check          # verify the live site after a deploy
```

## Updating the policy

1. Edit `content.mjs` or `terms.mjs` and bump `policyDate` or `termsDate` in `contact.json` (dates must not be in the future).
2. Run `npm run build` locally to confirm it passes.
3. Commit and push to `main`; GitHub Actions deploys automatically.
4. Run `npm run check` once the deploy finishes.
