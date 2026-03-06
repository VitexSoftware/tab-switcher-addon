# Changelog

All notable changes to the **Tab Switcher** Firefox add-on will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- Initial release of Tab Switcher.
- Right-click context menu with "Switch to Tab" submenu.
- Lists all open tabs across all browser windows.
- Multi-window support with window headings and separators.
- Active tab indicator (✓ checkmark).
- Tab title truncation at 60 characters with ellipsis.
- Automatic menu rebuild on tab/window events:
  - `tabs.onCreated`
  - `tabs.onRemoved`
  - `tabs.onUpdated`
  - `tabs.onMoved`
  - `tabs.onActivated`
  - `windows.onCreated`
  - `windows.onRemoved`
- Live menu refresh via `contextMenus.onShown` (when available).
- Error handling for tab switching failures.
- Extension icons (48×48 and 96×96).

[1.0.0]: https://github.com/VitexSoftware/tab-switcher-addon/releases/tag/v1.0.0
