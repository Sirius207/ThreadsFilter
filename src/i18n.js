/**
 * Internationalization utility for the Threads Comment Filter extension
 * Supports multiple languages with flexible configuration
 */

class I18n {
  constructor() {
    this.currentLocale = "en"; // Default to English
    this.fallbackLocale = "en";

    // Language configuration - easy to extend for new languages
    this.languageConfig = {
      en: {
        name: "English",
        nativeName: "English",
        flag: "flag-en",
        direction: "ltr",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      zh_TW: {
        name: "Traditional Chinese",
        nativeName: "繁體中文",
        flag: "flag-zh",
        direction: "ltr",
        fontFamily: "PingFang TC, Microsoft JhengHei, system-ui, sans-serif",
      },
      ja: {
        name: "Japanese",
        nativeName: "日本語",
        flag: "flag-jp",
        direction: "ltr",
        fontFamily: "Hiragino Sans, Yu Gothic, system-ui, sans-serif",
      },
      // Easy to add more languages:
      // ko: {
      //   name: "Korean",
      //   nativeName: "한국어",
      //   flag: "flag-kr",
      //   direction: "ltr",
      //   fontFamily: "Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
      // },
      // fr: {
      //   name: "French",
      //   nativeName: "Français",
      //   flag: "flag-fr",
      //   direction: "ltr",
      //   fontFamily: "system-ui, -apple-system, sans-serif"
      // }
    };

    this.translations = {
      // Minimal internal translations as fallback for dynamic language switching
      // Primary translations are in src/_locales/[locale]/messages.json
      en: {
        popupTitle: "Threads Comment Filter",
        filterSettings: "Filter Settings",
        enableCommentFiltering: "Enable Comment Filtering",
        showFollowerCounts: "Show Follower Counts",
        displayMode: "Display Mode",
        hideComments: "Hide Comments",
        grayscaleComments: "Grayscale Comments",
        followerCountFilter: "Follower Count Filter",
        minimumFollowers: "Minimum Followers:",
        avatarFilters: "Avatar Filters",
        hideDefaultAvatars: "Hide Default Avatars",
        filterStatistics: "Filter Statistics",
        total: "Total:",
        totalFiltered: "Total Filtered:",
        byFollowerCount: "By Follower Count:",
        byDefaultAvatars: "By Default Avatars:",
        refreshStats: "Refresh Stats",
        updating: "Updating...",
        advancedSettings: "Advanced Settings",
        grayscaleOpacity: "Grayscale Opacity:",
        grayscaleOpacityDescription:
          "Adjust the opacity of filtered comments in grayscale mode",
        maximumFollowers: "Maximum Followers:",
        hideVerifiedAccounts: "Hide Verified Accounts",
        enableDebugMode: "Enable Debug Mode",
        debugModeDescription: "Show detailed logs in browser console",
        clickToShowFilteredComments: "Click to Show Filtered Comments",
        clickToShowDescription:
          "When enabled, filtered comments require a click to show instead of hover",
        resetToDefaults: "Reset to Defaults",
        hideAnimation: "Hide Animation",
        hideAnimationDescription:
          "When enabled, hidden comments use a fade-out animation; when disabled, they disappear instantly",
      },
      zh_TW: {
        popupTitle: "Threads 留言過濾器",
        filterSettings: "過濾設定",
        enableCommentFiltering: "啟用留言過濾",
        showFollowerCounts: "顯示追蹤者數量",
        displayMode: "顯示模式",
        hideComments: "隱藏留言",
        grayscaleComments: "灰階留言",
        followerCountFilter: "追蹤者數量過濾",
        minimumFollowers: "最少追蹤者：",
        avatarFilters: "頭像過濾",
        hideDefaultAvatars: "隱藏預設頭像",
        filterStatistics: "過濾統計",
        total: "總計：",
        totalFiltered: "已過濾：",
        byFollowerCount: "依追蹤者數量：",
        byDefaultAvatars: "依預設頭像：",
        refreshStats: "重新整理統計",
        updating: "更新中...",
        advancedSettings: "進階設定",
        grayscaleOpacity: "灰階透明度：",
        grayscaleOpacityDescription: "調整灰階模式下已過濾留言的透明度",
        maximumFollowers: "最多追蹤者：",
        hideVerifiedAccounts: "隱藏認證帳戶",
        enableDebugMode: "啟用除錯模式",
        debugModeDescription: "在瀏覽器控制台中顯示詳細日誌",
        clickToShowFilteredComments: "點擊顯示已過濾留言",
        clickToShowDescription:
          "啟用後，已過濾的留言需要點擊才能顯示，而不是懸停",
        resetToDefaults: "重設為預設值",
        hideAnimation: "隱藏動畫",
        hideAnimationDescription:
          "啟用時，隱藏的留言會使用漸進消失動畫；停用時會直接消失",
      },
      ja: {
        popupTitle: "Threads コメントフィルター",
        filterSettings: "フィルター設定",
        enableCommentFiltering: "コメントフィルタリングを有効にする",
        showFollowerCounts: "フォロワー数を表示",
        displayMode: "表示モード",
        hideComments: "コメントを非表示",
        grayscaleComments: "グレースケールコメント",
        followerCountFilter: "フォロワー数フィルター",
        minimumFollowers: "最小フォロワー数：",
        avatarFilters: "アバターフィルター",
        hideDefaultAvatars: "デフォルトアバターを非表示",
        filterStatistics: "フィルター統計",
        total: "合計：",
        totalFiltered: "フィルター済み：",
        byFollowerCount: "フォロワー数による：",
        byDefaultAvatars: "デフォルトアバターによる：",
        refreshStats: "統計を更新",
        updating: "更新中...",
        advancedSettings: "詳細設定",
        grayscaleOpacity: "グレースケール透明度：",
        grayscaleOpacityDescription:
          "グレースケールモードでフィルターされたコメントの透明度を調整",
        maximumFollowers: "最大フォロワー数：",
        hideVerifiedAccounts: "認証済みアカウントを非表示",
        enableDebugMode: "デバッグモードを有効にする",
        debugModeDescription: "ブラウザコンソールに詳細ログを表示",
        clickToShowFilteredComments: "フィルターされたコメントをクリックで表示",
        clickToShowDescription:
          "有効にすると、フィルターされたコメントはホバーではなくクリックで表示されます",
        resetToDefaults: "デフォルトにリセット",
        hideAnimation: "非表示アニメーション",
        hideAnimationDescription:
          "有効にすると、非表示のコメントはフェードアウトアニメーションを使用；無効にすると即座に消えます",
      },
    };
  }

  /**
   * Get a translated string by key
   * @param {string} key - The translation key
   * @param {string[]} substitutions - Optional substitutions for placeholders
   * @returns {string} The translated string
   */
  getMessage(key, substitutions = []) {
    // For dynamic language switching, prioritize internal translations
    if (this.currentLocale !== this.fallbackLocale) {
      const internalTranslation = this.translations[this.currentLocale]?.[key];
      if (internalTranslation) {
        console.log(
          `getMessage: Using internal translation for '${key}': '${internalTranslation}'`
        );
        return internalTranslation;
      }
    }

    try {
      // Use Chrome's i18n API as primary source
      const message = chrome.i18n.getMessage(key, substitutions);
      if (message) {
        console.log(`getMessage: Using Chrome i18n for '${key}': '${message}'`);
        return message;
      }
    } catch (error) {
      console.log(`getMessage: Chrome i18n failed for '${key}':`, error);
    }

    // Fallback to internal translations or key itself
    const fallbackTranslation =
      this.translations[this.currentLocale]?.[key] ||
      this.translations[this.fallbackLocale]?.[key] ||
      key;

    console.log(
      `getMessage: Fallback translation for '${key}': '${fallbackTranslation}'`
    );
    return fallbackTranslation;
  }

  /**
   * Get the current locale
   * @returns {string} The current locale (e.g., 'en', 'zh_TW')
   */
  getLocale() {
    return this.currentLocale;
  }

  /**
   * Get language configuration for the current locale
   * @returns {Object} Language configuration object
   */
  getLanguageConfig() {
    return (
      this.languageConfig[this.currentLocale] ||
      this.languageConfig[this.fallbackLocale]
    );
  }

  /**
   * Check if the current locale uses a specific script or family
   * @param {string} script - Script family to check ('latin', 'cjk', 'arabic', etc.)
   * @returns {boolean} True if the locale uses the specified script
   */
  usesScript(script) {
    const scriptMap = {
      latin: ["en", "fr", "es", "de", "it", "pt"],
      cjk: ["zh_TW", "zh_CN", "ja", "ko"],
      arabic: ["ar", "fa", "ur"],
      cyrillic: ["ru", "uk", "bg"],
    };

    return scriptMap[script]?.includes(this.currentLocale) || false;
  }

  /**
   * Check if the current locale needs special font handling
   * @returns {boolean} True if the locale needs special fonts
   */
  needsSpecialFonts() {
    return (
      this.usesScript("cjk") ||
      this.usesScript("arabic") ||
      this.usesScript("cyrillic")
    );
  }

  /**
   * Get the current language direction (LTR or RTL)
   * @returns {string} 'ltr' or 'rtl'
   */
  getDirection() {
    return this.getLanguageConfig().direction || "ltr";
  }

  /**
   * Get the font family for the current locale
   * @returns {string} CSS font-family string
   */
  getFontFamily() {
    return this.getLanguageConfig().fontFamily || "system-ui, sans-serif";
  }

  /**
   * Get all available languages
   * @returns {Object} Object with locale codes as keys and language info as values
   */
  getAvailableLanguages() {
    return this.languageConfig;
  }

  /**
   * Apply translations to all elements with data-i18n attributes
   */
  applyTranslations() {
    console.log("Applying translations for locale:", this.currentLocale);
    const elements = document.querySelectorAll("[data-i18n]");
    console.log("Found", elements.length, "elements with data-i18n attributes");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getMessage(key);

      if (translation) {
        // Handle different element types
        if (element.tagName === "INPUT" && element.type === "placeholder") {
          element.placeholder = translation;
        } else if (element.tagName === "IMG") {
          element.alt = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Apply translations to title and other meta elements
    const title = this.getMessage("popupTitle");
    if (title && document.title !== title) {
      document.title = title;
    }

    console.log("Translations applied successfully");
  }

  /**
   * Initialize i18n for the popup
   */
  async init() {
    console.log("Initializing i18n system...");

    // Load saved language preference first
    await this.loadLanguagePreference();

    // Set document direction and language
    document.documentElement.setAttribute("dir", this.getDirection());
    document.documentElement.setAttribute("lang", this.currentLocale);

    // Apply font family for the current locale
    this.applyFontFamily();

    // Apply translations
    this.applyTranslations();

    // Add language selector if needed
    this.addLanguageSelector();

    console.log("i18n system initialized successfully");
  }

  /**
   * Apply font family based on current locale
   */
  applyFontFamily() {
    const fontFamily = this.getFontFamily();
    if (fontFamily) {
      document.body.style.fontFamily = fontFamily;
      console.log(`Applied font family: ${fontFamily}`);
    }
  }

  /**
   * Add language selector to the popup
   */
  addLanguageSelector() {
    // Check if language selector already exists
    if (document.querySelector(".language-selector")) {
      console.log("Language selector already exists");
      return;
    }

    console.log("Adding language selector...");

    // Create language selector container
    const langSelector = document.createElement("div");
    langSelector.className = "language-selector";

    // Create globe icon
    const globeIcon = document.createElement("div");
    globeIcon.className = "globe-icon";
    globeIcon.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    `;

    // Create dropdown menu using language configuration
    const dropdown = document.createElement("div");
    dropdown.className = "language-dropdown";

    // Generate language options dynamically from configuration
    const languageOptions = Object.entries(this.languageConfig)
      .map(
        ([locale, config]) => `
        <div class="language-option ${this.currentLocale === locale ? "selected" : ""}" data-lang="${locale}">
          <div class="language-flag ${config.flag}"></div>
          <span>${config.nativeName}</span>
        </div>
      `
      )
      .join("");

    dropdown.innerHTML = languageOptions;

    // Add click event to globe icon
    globeIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    // Add click events to language options
    dropdown.querySelectorAll(".language-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const lang = option.getAttribute("data-lang");
        console.log("Language option clicked:", lang);
        this.changeLanguage(lang);
        dropdown.classList.remove("show");
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!langSelector.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });

    // Append elements
    langSelector.appendChild(globeIcon);
    langSelector.appendChild(dropdown);

    // Insert next to the title in the header
    const header = document.querySelector("header");
    if (header) {
      header.appendChild(langSelector);
      console.log("Language selector added to header");
    } else {
      console.error("Header not found!");
    }
  }

  /**
   * Change the language
   * @param {string} locale - The new locale
   */
  async changeLanguage(locale) {
    console.log(`Changing language from ${this.currentLocale} to ${locale}`);

    // Save language preference
    try {
      await chrome.storage.sync.set({ threadsFilterLanguage: locale });
      console.log("Language preference saved");
    } catch (error) {
      console.warn("Failed to save language preference:", error);
    }

    // Update current locale
    this.currentLocale = locale;

    // Update document attributes
    document.documentElement.setAttribute("lang", this.currentLocale);

    // Apply font family for the new locale
    this.applyFontFamily();

    // Re-apply translations
    this.applyTranslations();

    // Update language selector
    this.updateLanguageSelector();

    console.log("Language changed successfully");
  }

  /**
   * Update language selector to reflect current language
   */
  updateLanguageSelector() {
    const dropdown = document.querySelector(".language-dropdown");
    if (dropdown) {
      // Update selected option
      const options = dropdown.querySelectorAll(".language-option");
      options.forEach((option) => {
        const lang = option.getAttribute("data-lang");
        if (lang === this.currentLocale) {
          option.classList.add("selected");
        } else {
          option.classList.remove("selected");
        }
      });
      console.log("Language selector updated");
    } else {
      console.error("Language dropdown element not found for update!");
    }
  }

  /**
   * Load saved language preference
   */
  async loadLanguagePreference() {
    try {
      const result = await chrome.storage.sync.get("threadsFilterLanguage");
      if (result.threadsFilterLanguage) {
        this.currentLocale = result.threadsFilterLanguage;
        console.log(`Loaded saved language preference: ${this.currentLocale}`);
      } else {
        // Try to detect browser language using available languages
        const browserLang = chrome.i18n.getUILanguage();
        this.currentLocale = this.detectBestLanguage(browserLang);
        console.log(
          `No saved language preference, using detected: ${this.currentLocale} (from browser: ${browserLang})`
        );
      }
    } catch (error) {
      console.warn("Failed to load language preference:", error);
      this.currentLocale = this.fallbackLocale;
    }
  }

  /**
   * Detect the best available language based on browser language
   * @param {string} browserLang - Browser language code
   * @returns {string} Best matching locale code
   */
  detectBestLanguage(browserLang) {
    if (!browserLang) return this.fallbackLocale;

    const availableLocales = Object.keys(this.languageConfig);

    // Direct match
    if (availableLocales.includes(browserLang)) {
      return browserLang;
    }

    // Language code match (e.g., 'zh' matches 'zh_TW')
    const languageCode = browserLang.split("_")[0];
    for (const locale of availableLocales) {
      if (locale.startsWith(languageCode)) {
        return locale;
      }
    }

    // Script-based fallback
    if (languageCode === "zh") {
      return "zh_TW"; // Default to Traditional Chinese for Chinese browsers
    }

    return this.fallbackLocale;
  }
}

// Create global i18n instance
window.i18n = new I18n();
