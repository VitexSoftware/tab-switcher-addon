# Contributing to Tab Switcher

Thank you for your interest in contributing to **Tab Switcher**! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Guidelines](#coding-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive experience for everyone.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/tab-switcher-addon.git
   cd tab-switcher-addon
   ```

3. **Create a branch** for your changes:

   ```bash
   git checkout -b feature/my-improvement
   ```

## Development Setup

### Prerequisites

- **Firefox** 57.0 or later
- **web-ext** (recommended):

  ```bash
  npm install -g web-ext
  ```

### Running the Extension

```bash
# Start Firefox with the extension loaded (auto-reloads on changes)
web-ext run

# Or load manually:
# 1. Open Firefox → about:debugging#/runtime/this-firefox
# 2. Click "Load Temporary Add-on…"
# 3. Select manifest.json
```

### Linting

```bash
web-ext lint
```

### Debugging

1. Go to `about:debugging#/runtime/this-firefox`.
2. Find **Tab Switcher** and click **Inspect**.
3. Use the console to view logs and errors.

## Making Changes

### Architecture Overview

The extension is intentionally minimal:

- **`manifest.json`** – Extension metadata, permissions, and configuration.
- **`background.js`** – All logic lives here: context menu creation, tab querying, and event handling.
- **`icons/`** – Extension icons in 48×48 and 96×96 PNG format.

### Common Contribution Areas

- 🐛 **Bug fixes** – Fix issues with tab switching, menu rendering, or edge cases
- ✨ **New features** – Add search/filter, pinned tab indicators, tab preview, etc.
- 🎨 **Icons** – Improve or redesign the extension icons
- 📖 **Documentation** – Improve README, add examples, fix typos
- 🌍 **Localization** – Add i18n support via `_locales/`

## Coding Guidelines

### JavaScript

- Use **`const`** and **`let`** (never `var`).
- Use **`async`/`await`** for asynchronous operations.
- Use **template literals** for string interpolation.
- Keep functions small and focused.
- Add comments for non-obvious logic.
- Handle errors gracefully with `try`/`catch`.

### General

- Keep the extension **lightweight** – avoid external dependencies.
- Maintain backward compatibility with Firefox 57+.
- Test with both single and multi-window setups.
- Test with edge cases: many tabs, tabs with no title, tabs loading, etc.

### Naming Conventions

- `camelCase` for variables and functions.
- `UPPER_SNAKE_CASE` for constants.
- Descriptive names that explain purpose.

## Submitting a Pull Request

1. **Commit** your changes with a clear message:

   ```bash
   git commit -m "Add pinned tab indicator to menu items"
   ```

2. **Push** to your fork:

   ```bash
   git push origin feature/my-improvement
   ```

3. **Open a Pull Request** on GitHub against the `main` branch.

4. In your PR description, include:
   - **What** the change does
   - **Why** it's needed
   - **How** to test it
   - Screenshots (if it's a visual change)

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Extension loads without errors in Firefox
- [ ] `web-ext lint` passes without warnings
- [ ] Tested with single window and multiple windows
- [ ] Tested with many tabs open (20+)
- [ ] Updated documentation if needed
- [ ] Commit messages are clear and descriptive

## Reporting Issues

When filing an issue, please include:

1. **Firefox version** (e.g., Firefox 125.0)
2. **Operating system** (e.g., Ubuntu 24.04, Windows 11)
3. **Steps to reproduce** the issue
4. **Expected behavior** vs. **actual behavior**
5. **Console errors** (from `about:debugging` → Inspect)

---

Thank you for contributing! 🎉
