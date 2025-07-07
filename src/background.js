// Background script for Threads Comment Filter extension

class BackgroundService {
  constructor() {
    this.init();
  }

  init() {
    // Set up extension installation/update handlers
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstall(details);
    });

    // Handle extension icon click
    chrome.action.onClicked.addListener((tab) => {
      this.handleIconClick(tab);
    });

    // Listen for tab updates to inject content script if needed
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.handleTabUpdate(tabId, changeInfo, tab);
    });
  }

  handleInstall(details) {
    if (details.reason === "install") {
      // Set default settings on first install
      this.setDefaultSettings();
      console.log("Threads Comment Filter extension installed");
    } else if (details.reason === "update") {
      console.log("Threads Comment Filter extension updated");
    }
  }

  async setDefaultSettings() {
    const defaultSettings = {
      enableFilter: true,
      showFollowerCount: true,
      displayMode: "grayscale",
      minFollowers: 20,
      maxFollowers: null,
      hideVerified: false,
      hideDefaultAvatars: true,
      debug: false,
      grayscaleOpacity: 0.1,
    };

    try {
      await chrome.storage.sync.set({ threadsFilterSettings: defaultSettings });
      console.log("Default settings saved");
    } catch (error) {
      console.error("Failed to save default settings:", error);
    }
  }

  handleIconClick(tab) {
    // Icon click is handled by popup.html
    console.log("Tab clicked:", tab);
  }

  handleTabUpdate(tabId, changeInfo, tab) {
    // Check if the tab is a Threads page and has finished loading
    if (
      changeInfo.status === "complete" &&
      tab.url &&
      tab.url.includes("threads.com")
    ) {
      // Ensure content script is injected (though it should be automatic)
      this.ensureContentScript(tabId);
    }
  }

  async ensureContentScript(tabId) {
    try {
      // Check if content script is already loaded by trying to send a message
      await chrome.tabs.sendMessage(tabId, { action: "ping" });
    } catch (error) {
      console.error("Failed to ping content script:", error);
      // Content script not loaded, inject it
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"],
        });

        await chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ["styles.css"],
        });

        console.log("Content script injected into tab:", tabId);
      } catch (injectionError) {
        console.error("Failed to inject content script:", injectionError);
      }
    }
  }

  // Handle context menu (if needed in future)
  setupContextMenu() {
    chrome.contextMenus.create({
      id: "threads-filter-toggle",
      title: "Toggle Comment Filter",
      contexts: ["page"],
      documentUrlPatterns: ["https://www.threads.com/*"],
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "threads-filter-toggle") {
        this.toggleFilter(tab.id);
      }
    });
  }

  async toggleFilter(tabId) {
    try {
      // Get current settings
      const result = await chrome.storage.sync.get("threadsFilterSettings");
      const settings = result.threadsFilterSettings || {};

      // Toggle the filter
      settings.enableFilter = !settings.enableFilter;

      // Save updated settings
      await chrome.storage.sync.set({ threadsFilterSettings: settings });

      // Notify content script
      chrome.tabs.sendMessage(tabId, {
        action: "updateSettings",
        settings: settings,
      });
    } catch (error) {
      console.error("Failed to toggle filter:", error);
    }
  }

  // Clean up resources when extension is disabled/uninstalled
  cleanup() {
    if (chrome.contextMenus) {
      chrome.contextMenus.removeAll();
    }
  }
}

// Initialize background service
const backgroundService = new BackgroundService();

// Handle extension lifecycle
chrome.runtime.onSuspend.addListener(() => {
  backgroundService.cleanup();
});
