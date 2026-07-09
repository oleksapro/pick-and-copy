import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' with { type: 'json' }

export default defineManifest({
  manifest_version: 3,
  name: 'Pick & Copy as Markdown',
  version: pkg.version,
  description: 'Pick any element on a page and copy it as Markdown.',
  icons: {
    16: 'public/icons/icon16.png',
    48: 'public/icons/icon48.png',
    128: 'public/icons/icon128.png',
  },
  action: {
    default_icon: {
      16: 'public/icons/icon16.png',
      48: 'public/icons/icon48.png',
      128: 'public/icons/icon128.png',
    },
    default_title: 'Pick & Copy as Markdown',
  },
  background: {
    service_worker: 'src/background.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content.js'],
    },
  ],
  permissions: ['activeTab', 'scripting', 'clipboardWrite'],
  browser_specific_settings: {
    gecko: {
      id: 'pick-and-copy@local.extension',
      strict_min_version: '121.0',
    },
  },
})
