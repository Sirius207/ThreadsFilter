// Default settings
const DEFAULT_SETTINGS = {
  enableFilter: true,
  showFollowerCount: true,
  displayMode: "grayscale",
  minFollowers: 20,
  maxFollowers: null,
  hideVerified: false,
  hideDefaultAvatars: true,
  debug: false,
  grayscaleOpacity: 0.3,
};

class PopupController {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.stats = {
      totalCount: 0,
      filteredCount: 0,
      followerFilteredCount: 0,
      avatarFilteredCount: 0,
    };
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.bindEvents();
    this.updateUI();

    // Add a small delay to ensure popup is fully loaded before requesting stats
    setTimeout(() => {
      this.requestStats();
    }, 100);

    this.setupStatsListener();

    // Set up periodic stats updates
    this.statsUpdateInterval = setInterval(() => {
      this.requestStats();
    }, 2000); // Update every 2 seconds
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get("threadsFilterSettings");

      // If no settings exist (first install), use defaults and save them
      if (!result.threadsFilterSettings) {
        this.settings = { ...DEFAULT_SETTINGS };
        // Save the default settings to storage
        await chrome.storage.sync.set({ threadsFilterSettings: this.settings });
      } else {
        // Merge existing settings with defaults (in case new settings were added)
        this.settings = {
          ...DEFAULT_SETTINGS,
          ...result.threadsFilterSettings,
        };
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      // Fallback to defaults if there's an error
      this.settings = { ...DEFAULT_SETTINGS };
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set({ threadsFilterSettings: this.settings });
      // Notify content script of changes
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (
        tab &&
        (tab.url.includes("threads.net") || tab.url.includes("threads.com"))
      ) {
        chrome.tabs.sendMessage(tab.id, {
          action: "updateSettings",
          settings: this.settings,
        });

        // Request updated stats after a short delay to allow content script to process
        setTimeout(() => {
          this.requestStats();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }

  bindEvents() {
    if (this.settings.debug) {
      console.log("Popup: Binding events...");
    }

    // Toggle switches
    document.getElementById("enableFilter").addEventListener("change", (e) => {
      this.settings.enableFilter = e.target.checked;
      this.saveSettings();
    });

    document
      .getElementById("showFollowerCount")
      .addEventListener("change", (e) => {
        this.settings.showFollowerCount = e.target.checked;
        this.saveSettings();
      });

    // Display mode radio buttons
    document.querySelectorAll('input[name="displayMode"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.settings.displayMode = e.target.value;
          this.saveSettings();
        }
      });
    });

    // Follower count inputs
    document.getElementById("minFollowers").addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      this.settings.minFollowers = isNaN(value) ? null : value;
      this.saveSettings();
    });

    document.getElementById("maxFollowers").addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      this.settings.maxFollowers = isNaN(value) ? null : value;
      this.saveSettings();
    });

    // Avatar filters
    document.getElementById("hideVerified").addEventListener("change", (e) => {
      this.settings.hideVerified = e.target.checked;
      this.saveSettings();
    });

    document
      .getElementById("hideDefaultAvatars")
      .addEventListener("change", (e) => {
        this.settings.hideDefaultAvatars = e.target.checked;
        this.saveSettings();
      });

    // Debug mode toggle
    document.getElementById("debugMode").addEventListener("change", (e) => {
      this.settings.debug = e.target.checked;
      this.saveSettings();
    });

    // Grayscale opacity slider
    const opacitySlider = document.getElementById("grayscaleOpacity");
    const opacityValue = document.getElementById("opacityValue");

    if (opacitySlider && opacityValue) {
      opacitySlider.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        this.settings.grayscaleOpacity = value;
        opacityValue.textContent = value.toFixed(1);
        this.saveSettings();
      });
    }

    // Buttons
    const resetSettingsBtn = document.getElementById("resetSettings");
    const refreshStatsBtn = document.getElementById("refreshStats");

    if (this.settings.debug) {
      console.log("Popup: Button elements found:", {
        resetSettings: !!resetSettingsBtn,
        refreshStats: !!refreshStatsBtn,
      });
    }

    resetSettingsBtn.addEventListener("click", () => {
      this.resetToDefaults();
    });

    refreshStatsBtn.addEventListener("click", () => {
      this.requestStats();
    });

    // Advanced Settings toggle
    const advancedToggle = document.getElementById("advancedToggle");
    const advancedContent = document.getElementById("advancedContent");
    const expandIcon = document.getElementById("expandIcon");

    if (advancedToggle && advancedContent && expandIcon) {
      advancedToggle.addEventListener("click", () => {
        const isExpanded = advancedContent.style.display !== "none";

        if (isExpanded) {
          // Collapse
          advancedContent.style.display = "none";
          advancedToggle.classList.remove("expanded");
          expandIcon.textContent = "▼";
        } else {
          // Expand
          advancedContent.style.display = "block";
          advancedToggle.classList.add("expanded");
          expandIcon.textContent = "▲";
        }
      });
    }

    if (this.settings.debug) {
      console.log("Popup: Events bound successfully");
    }
  }

  updateUI() {
    // Update toggle switches
    document.getElementById("enableFilter").checked =
      this.settings.enableFilter;
    document.getElementById("showFollowerCount").checked =
      this.settings.showFollowerCount;

    // Update display mode radio buttons
    document.getElementById("hideMode").checked =
      this.settings.displayMode === "hide";
    document.getElementById("grayscaleMode").checked =
      this.settings.displayMode === "grayscale";

    // Update follower count inputs
    document.getElementById("minFollowers").value =
      this.settings.minFollowers || "";
    document.getElementById("maxFollowers").value =
      this.settings.maxFollowers || "";

    // Update avatar filters
    document.getElementById("hideVerified").checked =
      this.settings.hideVerified;
    document.getElementById("hideDefaultAvatars").checked =
      this.settings.hideDefaultAvatars;

    // Update debug mode
    document.getElementById("debugMode").checked = this.settings.debug;

    // Update grayscale opacity slider
    const opacitySlider = document.getElementById("grayscaleOpacity");
    const opacityValue = document.getElementById("opacityValue");
    if (opacitySlider && opacityValue) {
      opacitySlider.value = this.settings.grayscaleOpacity;
      opacityValue.textContent = this.settings.grayscaleOpacity.toFixed(1);
    }

    // Set Advanced Settings initial state (collapsed by default)
    const advancedContent = document.getElementById("advancedContent");
    const advancedToggle = document.getElementById("advancedToggle");
    const expandIcon = document.getElementById("expandIcon");

    if (advancedContent && advancedToggle && expandIcon) {
      advancedContent.style.display = "none";
      advancedToggle.classList.remove("expanded");
      expandIcon.textContent = "▼";
    }
  }

  async resetToDefaults() {
    this.settings = { ...DEFAULT_SETTINGS };
    await this.saveSettings();
    this.updateUI();
  }

  async requestStats() {
    try {
      const refreshBtn = document.getElementById("refreshStats");
      if (refreshBtn) {
        refreshBtn.textContent = "Updating...";
        refreshBtn.disabled = true;
      }

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (
        tab &&
        (tab.url.includes("threads.net") || tab.url.includes("threads.com"))
      ) {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "getStats",
        });
        if (response) {
          if (this.settings.debug) {
            console.log("Popup: Received stats from content script:", response);
          }
          this.stats = response;
          this.updateStatsDisplay();
          if (this.settings.debug) {
            console.log("Popup: Stats updated:", this.stats);
          }
        } else if (this.settings.debug) {
          console.log("Popup: No response from content script");
        }
      } else {
        if (this.settings.debug) {
          console.log("Popup: Not on a Threads page, cannot get stats");
        }
      }
    } catch (error) {
      if (this.settings.debug) {
        console.log("Popup: Could not get stats from content script:", error);
      }
    } finally {
      const refreshBtn = document.getElementById("refreshStats");
      if (refreshBtn) {
        refreshBtn.textContent = "Refresh Stats";
        refreshBtn.disabled = false;
      }
    }
  }

  setupStatsListener() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "updateStats") {
        this.stats = message.stats;
        this.updateStatsDisplay();
      }
    });
  }

  updateStatsDisplay() {
    const totalCountElement = document.getElementById("totalCount");
    const filteredCountElement = document.getElementById("filteredCount");
    const followerFilteredElement = document.getElementById(
      "followerFilteredCount"
    );
    const avatarFilteredElement = document.getElementById(
      "avatarFilteredCount"
    );

    if (this.settings.debug) {
      console.log("Popup: updateStatsDisplay called with stats:", this.stats);
      console.log("Popup: Found elements:", {
        totalCount: !!totalCountElement,
        filteredCount: !!filteredCountElement,
        followerFiltered: !!followerFilteredElement,
        avatarFiltered: !!avatarFilteredElement,
      });
    }

    if (totalCountElement) {
      totalCountElement.textContent = this.stats.totalCount;
      if (this.settings.debug) {
        console.log("Popup: Set totalCount to:", this.stats.totalCount);
      }
    } else if (this.settings.debug) {
      console.log("Popup: totalCount element not found!");
    }

    if (filteredCountElement) {
      filteredCountElement.textContent = this.stats.filteredCount;
    }
    if (followerFilteredElement) {
      followerFilteredElement.textContent = this.stats.followerFilteredCount;
    }
    if (avatarFilteredElement) {
      avatarFilteredElement.textContent = this.stats.avatarFilteredCount;
    }

    if (this.settings.debug) {
      console.log("Popup: Updated stats display:", {
        total: this.stats.totalCount,
        filtered: this.stats.filteredCount,
        follower: this.stats.followerFilteredCount,
        avatar: this.stats.avatarFilteredCount,
      });
    }
  }

  cleanup() {
    if (this.statsUpdateInterval) {
      clearInterval(this.statsUpdateInterval);
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const popup = new PopupController();

  // Clean up when popup is closed
  window.addEventListener("beforeunload", () => {
    popup.cleanup();
  });
});
