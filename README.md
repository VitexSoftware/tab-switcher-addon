# Tab Switcher – Firefox Add-on

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/firefox/)
[![Manifest Version](https://img.shields.io/badge/manifest-v2-blue)](manifest.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Quickly switch between all your open tabs from the right-click context menu.

![Tab Switcher Icon](icons/icon96.png)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
  - [From Firefox Add-ons (AMO)](#from-firefox-add-ons-amo)
  - [Manual Installation (Development)](#manual-installation-development)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Building & Packaging](#building--packaging)
- [Development](#development)
- [Permissions](#permissions)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tab Switcher** is a lightweight Firefox extension that adds a "Switch to Tab" submenu to the browser's right-click context menu. It lists every open tab across all windows, letting you jump to any tab in just two clicks—without reaching for the tab bar.

## Features

- 📋 **Context menu integration** – Access all tabs via right-click → "Switch to Tab"
- 🪟 **Multi-window support** – Tabs are grouped by window when multiple windows are open
- ✓ **Active tab indicator** – The currently active tab is marked with a ✓ checkmark
- ⚡ **Always up-to-date** – The menu rebuilds automatically whenever tabs are created, closed, moved, or updated
- 🔄 **Live refresh** – On supported Firefox versions, the menu refreshes on every context menu open
- ✂️ **Title truncation** – Long tab titles are cleanly truncated to 60 characters with an ellipsis
- 🪶 **Lightweight** – No popup UI, no options page, no external dependencies—just a single background script

## Screenshots

Right-click anywhere on a page to see the "Switch to Tab" submenu:

```
┌──────────────────────────────┐
│  Switch to Tab            ►  │
│  ┌────────────────────────┐  │
│  │ ⬜ Window 1 (3 tabs)   │  │
│  │ GitHub - Home ✓        │  │
│  │ Stack Overflow – Whe…  │  │
│  │ MDN Web Docs           │  │
│  │ ─────────────────────  │  │
│  │ ⬜ Window 2 (2 tabs)   │  │
│  │ YouTube                │  │
│  │ Firefox Add-ons        │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## Installation

### From Firefox Add-ons (AMO)

<!-- Update this link once published -->
1. Visit the [Tab Switcher add-on page](https://addons.mozilla.org/firefox/) on AMO.
2. Click **"Add to Firefox"**.
3. Approve the requested permissions.

### Manual Installation (Development)

1. Clone the repository:

   ```bash
   git clone https://github.com/VitexSoftware/tab-switcher-addon.git
   cd tab-switcher-addon
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.

3. Click **"Load Temporary Add-on…"**.

4. Select the `manifest.json` file from the project directory.

The extension will be loaded until Firefox is restarted. For persistent installation during development, consider using [`web-ext`](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/):

```bash
npm install -g web-ext
web-ext run
```

## Usage

1. **Right-click** anywhere on any web page.
2. Hover over **"Switch to Tab"** in the context menu.
3. Click on any tab in the list to switch to it immediately.

- The **currently active tab** in each window is marked with a **✓**.
- When **multiple windows** are open, tabs are grouped under window headings (e.g., "⬜ Window 1 (3 tabs)").

## How It Works

The extension uses a single background script (`background.js`) that:

1. **Creates a context menu** – A root menu item "Switch to Tab" is added to the browser's context menu.
2. **Queries all windows and tabs** – Uses `browser.windows.getAll({ populate: true })` to fetch every tab across all open windows.
3. **Builds submenu items** – Each tab becomes a clickable menu entry. Multi-window setups include separators and window labels.
4. **Listens for changes** – Event listeners on `tabs.onCreated`, `tabs.onRemoved`, `tabs.onUpdated`, `tabs.onMoved`, `tabs.onActivated`, `windows.onCreated`, and `windows.onRemoved` trigger a menu rebuild.
5. **Handles clicks** – When a menu item is clicked, the extension activates the selected tab and focuses its window using `browser.tabs.update()` and `browser.windows.update()`.
6. **Live refresh** – If `browser.contextMenus.onShown` is available, the menu is refreshed just before it appears.

### Key Functions

| Function | Description |
|---|---|
| `truncate(str, max)` | Truncates a string to `max` characters, appending "…" if needed |
| `getTabLabel(tab, index)` | Generates a display label for a tab (title + active indicator) |
| `rebuildMenu()` | Tears down and rebuilds the entire context menu from current tabs |

## Project Structure

```
tab-switcher-addon/
├── background.js        # Main extension logic (context menu & tab switching)
├── manifest.json        # WebExtension manifest (v2)
├── Makefile             # Build/packaging automation
├── icons/
│   ├── icon48.png       # 48×48 extension icon
│   └── icon96.png       # 96×96 extension icon
├── README.md            # This file
├── CONTRIBUTING.md      # Contribution guidelines
├── CHANGELOG.md         # Version history
└── LICENSE              # MIT License
```

## Building & Packaging

### Using Make

Package the extension into a `.zip` file for distribution:

```bash
make package
```

This creates a zip archive in the parent directory (`../tab-switcher-addon.zip`), excluding development files like `.git/`, `*.md`, `node_modules/`, and the `Makefile` itself.

### Using web-ext

Alternatively, use Mozilla's `web-ext` tool:

```bash
# Lint the extension
web-ext lint

# Build a distributable .zip
web-ext build

# Run in a temporary Firefox profile
web-ext run
```

## Development

### Prerequisites

- **Firefox** 140.0 or later
- **GNU Make** (optional, for packaging)
- **web-ext** (optional, for development workflow)

### Quick Start

```bash
# Clone the repo
git clone https://github.com/VitexSoftware/tab-switcher-addon.git
cd tab-switcher-addon

# Run with web-ext (auto-reloads on file changes)
web-ext run

# Or load manually via about:debugging#/runtime/this-firefox
```

### Debugging

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Find "Tab Switcher" in the list of temporary extensions.
3. Click **"Inspect"** to open the developer tools for the background script.
4. Check the console for any errors (e.g., `Tab Switcher: could not switch tab`).

## Permissions

This extension requests the minimum permissions required:

| Permission | Reason |
|---|---|
| `tabs` | Read tab titles, URLs, and active state to build the menu |
| `contextMenus` | Create and manage the right-click context menu |

No data is collected, stored, or transmitted. The extension operates entirely locally.

## Browser Compatibility

| Browser | Supported | Notes |
|---|---|---|
| Firefox | ✅ 140.0+ | Full support (Manifest V2, Gecko engine) |
| Firefox ESR | ✅ 140.0+ | Full support |
| Chrome | ❌ | Uses `browser.*` APIs (Firefox-specific) |
| Edge | ❌ | Uses `browser.*` APIs (Firefox-specific) |

> **Note:** The extension uses Manifest V2 with `browser_specific_settings.gecko`, making it Firefox-specific. Porting to Chrome/Manifest V3 would require replacing `browser.*` with `chrome.*` and adapting the service worker model.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [VitexSoftware](https://github.com/VitexSoftware)
