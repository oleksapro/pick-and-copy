# Publishing "Pick & Copy as Markdown"

## 0. You don't always need to publish

Loading unpacked (`chrome://extensions` → Load unpacked → `dist/`) is a **one-time** step.
After that, whenever you run `npm run build` again, just hit the reload icon (⟳) on the
extension's card in `chrome://extensions` — no need to "load unpacked" again. Publishing is
only needed if you want to avoid Developer Mode entirely, sync across machines, or share it
with others.

## 1. Build & package

```bash
npm run build
cd dist && zip -r ../pick-and-copy.zip . && cd ..
```

`pick-and-copy.zip` is what you upload to Chrome/Edge stores.

## 2. Chrome Web Store

1. Create a Developer Dashboard account: https://chrome.google.com/webstore/devconsole
   (Google account + one-time **$5** registration fee — you do this yourself, it needs payment.)
2. "New Item" → upload `pick-and-copy.zip`.
3. Fill in the listing:
   - **Description**: what it does (pick an element, copy as Markdown).
   - **Screenshots**: 1280×800 or 640×400 (at least 1 required).
   - **Icon**: already included (128×128 in `public/icons/`).
   - **Category**: Productivity or Developer Tools.
   - **Permission justification** (required since v3 asks for `activeTab`, `scripting`,
     `clipboardWrite`): e.g. _"activeTab/scripting to inspect the picked element on the
     active page; clipboardWrite to copy the converted Markdown."_
   - **Privacy policy**: this extension sends no data anywhere and stores nothing — state
     that explicitly (a URL to a policy page isn't required if you declare no data collection
     in the dashboard's privacy form).
   - **Visibility**: choose **Public** (searchable) or **Unlisted** (installable only via
     direct link, not shown in search — good if this is just for you/your team).
4. Submit for review. Simple extensions like this are typically reviewed within a few hours
   to a couple of days.
5. Every future update: bump `version` in `package.json`, rebuild, re-zip, upload as a new
   version in the same dashboard listing.

## 3. Microsoft Edge Add-ons

Edge is Chromium-based, so the same `pick-and-copy.zip` works unmodified.

1. Create a Partner Center account: https://partner.microsoft.com/dashboard/microsoftedge/overview
   (free, separate account from Chrome's).
2. New extension → upload the same zip → fill listing (same fields as Chrome) → submit.

## 4. Firefox Add-ons (AMO)

Firefox requires **source code** for review whenever the submitted build is bundled/minified
(which Vite does), so you need two zips:

```bash
# 1. The built extension (same as Chrome/Edge)
cd dist && zip -r ../pick-and-copy-firefox.zip . && cd ..

# 2. Source for reviewers to rebuild and diff against your upload
zip -r pick-and-copy-source.zip . -x "node_modules/*" -x "dist/*" -x "*.zip"
```

Include a short note with the source zip (or in AMO's "notes to reviewer" field):

```
Build: npm install && npm run build
Output: dist/
Node version used: <run `node -v` and paste>
```

Steps:

1. Create a free account: https://addons.mozilla.org/developers/
2. Submit a new add-on → upload `pick-and-copy-firefox.zip` as the extension and
   `pick-and-copy-source.zip` under "source code".
3. Firefox review can take longer than Chrome's (days), especially on first submission.
4. Note: `manifest.config.js` sets `strict_min_version: 121.0` for Firefox (MV3 service
   worker support) — mention this if reviewers ask about minimum version.

## Quick reference

| Store         | Account cost | Needs source zip | Typical review time |
| ------------- | ------------ | ---------------- | ------------------- |
| Chrome        | $5 one-time  | No               | Hours–2 days        |
| Edge          | Free         | No               | Hours–2 days        |
| Firefox (AMO) | Free         | Yes              | Days                |
