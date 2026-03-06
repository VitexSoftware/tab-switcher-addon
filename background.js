// Tab Switcher - Background Script

const MENU_ROOT = "tab-switcher-root";
const MAX_TITLE_LENGTH = 60;

function truncate(str, max) {
  if (!str) return "(no title)";
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function getFavicon(tab) {
  // Use tab's favicon if available, otherwise use a generic one
  return tab.favIconUrl || "";
}

function getTabLabel(tab, index) {
  const title = truncate(tab.title, MAX_TITLE_LENGTH);
  const active = tab.active ? " ✓" : "";
  return `${title}${active}`;
}

async function rebuildMenu() {
  // Remove everything and rebuild
  await browser.contextMenus.removeAll();

  // Root submenu entry
  browser.contextMenus.create({
    id: MENU_ROOT,
    title: "Switch to Tab",
    contexts: ["all"]
  });

  let windows;
  try {
    windows = await browser.windows.getAll({ populate: true });
  } catch (e) {
    browser.contextMenus.create({
      id: "tab-error",
      parentId: MENU_ROOT,
      title: "(Could not load tabs)",
      contexts: ["all"]
    });
    return;
  }

  const multiWindow = windows.length > 1;

  windows.forEach((win, winIndex) => {
    const tabs = win.tabs;
    if (!tabs || tabs.length === 0) return;

    if (multiWindow) {
      // Add a separator + window heading between windows
      if (winIndex > 0) {
        browser.contextMenus.create({
          id: `sep-win-${win.id}`,
          parentId: MENU_ROOT,
          type: "separator",
          contexts: ["all"]
        });
      }
      browser.contextMenus.create({
        id: `win-label-${win.id}`,
        parentId: MENU_ROOT,
        title: `⬜ Window ${winIndex + 1} (${tabs.length} tab${tabs.length !== 1 ? "s" : ""})`,
        contexts: ["all"],
        enabled: false
      });
    }

    tabs.forEach((tab, tabIndex) => {
      const label = getTabLabel(tab, tabIndex);
      browser.contextMenus.create({
        id: `tab-${tab.id}`,
        parentId: MENU_ROOT,
        title: label,
        contexts: ["all"]
      });
    });
  });
}

// Switch to the tab when clicked
browser.contextMenus.onClicked.addListener(async (info) => {
  const id = info.menuItemId;
  if (!id.startsWith("tab-")) return;

  const tabId = parseInt(id.replace("tab-", ""), 10);
  if (isNaN(tabId)) return;

  try {
    const tab = await browser.tabs.get(tabId);
    await browser.tabs.update(tabId, { active: true });
    await browser.windows.update(tab.windowId, { focused: true });
  } catch (e) {
    console.error("Tab Switcher: could not switch tab", e);
  }
});

// Rebuild menu when tabs change
browser.tabs.onCreated.addListener(rebuildMenu);
browser.tabs.onRemoved.addListener(rebuildMenu);
browser.tabs.onUpdated.addListener(rebuildMenu);
browser.tabs.onMoved.addListener(rebuildMenu);
browser.tabs.onActivated.addListener(rebuildMenu);
browser.windows.onCreated.addListener(rebuildMenu);
browser.windows.onRemoved.addListener(rebuildMenu);

// Rebuild just before the context menu shows (so it's always fresh)
browser.contextMenus.onShown
  ? browser.contextMenus.onShown.addListener(async () => {
      await rebuildMenu();
      browser.contextMenus.refresh();
    })
  : null;

// Initial build
rebuildMenu();
