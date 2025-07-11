// Global debug flag for initialization logs
let globalDebug = false;

if (globalDebug) {
  console.log("Threads Comment Filter Extension: content.js loaded");
}

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
  grayscaleOpacity: 0.1,
  blurAmount: 0,
  clickToShow: false,
  hideAnimation: false,
};

// Language spacing constants - moved outside class for performance
const SPACE_LANGUAGES = [
  "en",
  "fr",
  "es",
  "pt",
  "it",
  "de",
  "nl",
  "sv",
  "da",
  "no",
  "fi",
  "pl",
  "cs",
  "sk",
  "hu",
  "ro",
  "hr",
  "sl",
  "et",
  "lv",
  "lt",
  "mt",
  "ga",
  "cy",
  "eu",
  "ca",
  "gl",
  "oc",
  "sc",
  "rm",
  "fur",
  "vec",
  "lmo",
  "pms",
  "nap",
  "scn",
  "co",
  "lij",
  "xmf",
  "ka",
  "hy",
  "az",
  "kk",
  "ky",
  "uz",
  "tk",
  "jv",
  "su",
  "id",
  "ms",
  "tl",
  "ceb",
  "war",
  "ilo",
  "pam",
  "bcl",
  "huw",
  "krj",
  "mdh",
  "tsg",
  "cps",
  "ak",
  "tw",
  "ee",
  "fon",
  "ha",
  "ig",
  "yo",
  "zu",
  "xh",
  "af",
  "sq",
  "am",
  "as",
  "ay",
  "be",
  "bs",
  "chr",
  "ckb",
  "dv",
  "el",
  "eo",
  "fa",
  "fj",
  "fo",
  "fy",
  "gd",
  "gn",
  "haw",
  "he",
  "ht",
  "hmn",
  "hsb",
  "is",
  "iw",
  "jw",
  "kl",
  "lb",
  "ln",
  "mg",
  "mi",
  "mr",
  "nb",
  "nd",
  "nn",
  "nso",
  "ny",
  "om",
  "os",
  "ps",
  "qu",
  "rn",
  "rw",
  "sd",
  "se",
  "sg",
  "sh",
  "sm",
  "sn",
  "so",
  "ss",
  "st",
  "sw",
  "syr",
  "tg",
  "ti",
  "to",
  "tt",
  "ug",
  "ur",
  "ve",
  "wo",
  "yi",
];

const NO_SPACE_LANGUAGES = [
  "zh",
  "ja",
  "ko",
  "th",
  "vi",
  "ar",
  "hi",
  "tr",
  "ru",
  "uk",
  "bg",
  "mk",
  "sr",
  "mn",
  "bo",
  "dz",
  "ne",
  "bn",
  "pa",
  "gu",
  "or",
  "ta",
  "te",
  "kn",
  "ml",
  "si",
  "my",
  "km",
  "lo",
];

// Fallback translations for internationalization - moved outside class for performance
const FALLBACK_TRANSLATIONS = {
  followers: {
    en: "followers",
    zh_TW: "位粉絲",
    zh_CN: "位粉絲",
    ja: "フォロワー",
    ko: "팔로워",
    fr: "abonnés",
    de: "Follower",
    es: "seguidores",
    pt: "seguidores",
    it: "follower",
    ru: "подписчиков",
    ar: "متابع",
    hi: "फॉलोअर्स",
    th: "ผู้ติดตาม",
    vi: "người theo dõi",
    tr: "takipçi",
    nl: "volgers",
    sv: "följare",
    da: "følgere",
    no: "følgere",
    fi: "seuraajaa",
    pl: "obserwujących",
    cs: "sledujících",
    sk: "sledujúcich",
    hu: "követő",
    ro: "urmași",
    bg: "последователи",
    hr: "pratitelja",
    sr: "пратилаца",
    sl: "sledilcev",
    et: "järgijat",
    lv: "sekojošo",
    lt: "sekėjų",
    mt: "segwaċi",
    ga: "leanúnaithe",
    cy: "ddilynwyr",
    eu: "jarraitzaile",
    ca: "seguidors",
    gl: "seguidores",
    oc: "seguitors",
    sc: "segudores",
    rm: "suandaders",
    fur: "seguidôrs",
    vec: "seguidori",
    lmo: "seguidor",
    pms: "seguidor",
    nap: "seguitor",
    scn: "siquituri",
    co: "seguitori",
    lij: "seguidô",
    xmf: "მაყურებელი",
    ka: "მიმდევარი",
    hy: "հետևորդ",
    az: "izləyici",
    kk: "жазылған",
    ky: "ээрчиген",
    uz: "obunachi",
    tk: "yzygiderli",
    mn: "дагалт",
    bo: "རྗེས་འཇུག",
    dz: "རྗེས་འཇུག",
    ne: "अनुयायी",
    bn: "অনুসরণকারী",
    pa: "ਫਾਲੋਅਰ",
    gu: "અનુયાયી",
    or: "ଅନୁଯାୟୀ",
    ta: "பின்தொடர்பவர்கள்",
    te: "అనుచరులు",
    kn: "ಅನುಯಾಯಿಗಳು",
    ml: "അനുയായികൾ",
    si: "අනුගාමිකයින්",
    my: "အားလုံးကို",
    km: "អ្នកដើរតាម",
    lo: "ຜູ້ຕິດຕາມ",
    jv: "pengikut",
    su: "pengikut",
    id: "pengikut",
    ms: "pengikut",
    tl: "mga tagasunod",
    ceb: "mga sumusunod",
    war: "mga sumusunod",
    ilo: "dagiti sumaruno",
    pam: "mangayupaya",
    bcl: "mga sumusunod",
    huw: "mga sumusunod",
    krj: "mga sumusunod",
    mdh: "mga sumusunod",
    tsg: "mga sumusunod",
    cps: "mga sumusunod",
    ak: "ahɔhɔ",
    tw: "ahɔhɔ",
    ee: "ɖokuiwo",
    fon: "ɖokuiwo",
    ha: "mabiyi",
    ig: "ndị na-eso",
    yo: "awọn ọmọ",
    zu: "abalandeli",
    xh: "abalandeli",
    af: "volgers",
    sq: "ndjekës",
    am: "ተከታዮች",
    as: "অনুসৰণকাৰী",
    ay: "qatiqiri",
    be: "падпісчыкаў",
    bs: "pratilaca",
    chr: "ᎠᏍᏓᏩᏕᏂᏏᏗ",
    ckb: "شوێنکەوتوو",
    dv: "ފޮލޯއަރުން",
    el: "ακόλουθοι",
    eo: "sekvantoj",
    fa: "دنبال‌کنندگان",
    fj: "vakayacagi",
    fo: "fylgjari",
    fy: "folgers",
    gd: "luchd-leanmhainn",
    gn: "tapykuehára",
    haw: "hoa hahai",
    he: "עוקבים",
    ht: "swiv",
    hmn: "cov neeg ua hauj lwm",
    hsb: "wobdźělenja",
    is: "fylgjendur",
    iw: "עוקבים",
    jw: "pengikut",
    kl: "qatigiit",
    lb: "Follower",
    ln: "bato ya libota",
    mg: "mpanaraka",
    mi: "kaiwhai",
    mk: "следбеници",
    mr: "अनुयायी",
    nb: "følgere",
    nd: "abalandeli",
    nn: "følgjarar",
    nso: "ba latelago",
    ny: "otsatira",
    om: "kanneen",
    os: "ахуыргæнинæгтæ",
    ps: "پیروان",
    qu: "qatiq",
    rn: "kurikira",
    rw: "abakurikira",
    sd: "پيروي",
    se: "dáiddár",
    sg: "wakpängö",
    sh: "pratitelja",
    sm: "tagata mulimuli",
    sn: "vateveri",
    so: "raacayaal",
    ss: "balandeli",
    st: "ba latelang",
    sw: "wafuasi",
    syr: "ܫܘܠܛܢܐ",
    tg: "пайравон",
    ti: "ወዳዶች",
    to: "kau maau",
    tt: "иярүчеләр",
    ug: "ئىزلىغۇچى",
    ur: "پیروکار",
    ve: "vha tevhelaho",
    wo: "góor",
    yi: "נאכגעגאנגענע",
    zh: "位粉絲",
  },
};

class ThreadsCommentFilter {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.filteredComments = new Set();
    this.followerFilteredComments = new Set();
    this.avatarFilteredComments = new Set();
    this.followerCache = new Map();
    this.processedComments = new Set();
    this.observer = null;
    this.isInitialized = false;
    this.statsUpdateDebounce = null; // Debounce timer for stats updates
    this.lastStatsUpdate = 0; // Track last stats update time
    this.filterApplyDebounce = null; // Debounce timer for filter application
    this.lastFilterApply = 0; // Track last filter application time
    this.lastCleanupTime = 0; // Track last cleanup time
    this.init();
  }

  // Helper method to get internationalized text
  getMessage(key, substitutions = []) {
    try {
      // Try to use Chrome's i18n API first
      const message = chrome.i18n.getMessage(key, substitutions);
      if (message) {
        return message;
      }
    } catch (error) {
      this.log(`Failed to get i18n message for key '${key}':`, error);
    }

    // Try to detect language from browser or document
    let detectedLang = "en";
    try {
      detectedLang = chrome.i18n.getUILanguage() || navigator.language || "en";
      // Extract base language code (e.g., "zh-TW" -> "zh_TW")
      detectedLang = detectedLang.replace("-", "_");
    } catch {
      this.log("Failed to detect language, using English fallback");
    }

    // Return fallback translation or key itself
    return (
      FALLBACK_TRANSLATIONS[key]?.[detectedLang] ||
      FALLBACK_TRANSLATIONS[key]?.[detectedLang.split("_")[0]] ||
      FALLBACK_TRANSLATIONS[key]?.["en"] ||
      key
    );
  }

  // Helper method for conditional logging
  log(message, ...args) {
    if (this.debug) {
      console.log(message, ...args);
    }
  }

  async init() {
    this.log("ThreadsCommentFilter: init() called");
    await this.loadSettings();
    this.log("ThreadsCommentFilter: Settings loaded");

    // Clean up any leftover hidden states from previous sessions
    this.cleanupHiddenStates();
    this.log("ThreadsCommentFilter: Hidden states cleaned up");

    this.setupMessageListener();
    this.log("ThreadsCommentFilter: Message listener setup");
    this.startObserving();
    this.log("ThreadsCommentFilter: Observer started");
    this.processExistingComments();
    this.log("ThreadsCommentFilter: Initial processing complete");
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get("threadsFilterSettings");
      if (result.threadsFilterSettings) {
        this.settings = { ...this.settings, ...result.threadsFilterSettings };
        this.debug = this.settings.debug || false; // Update debug mode
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  }

  // 提取 debounce 清理邏輯
  _clearFilterApplyDebounce() {
    if (this.filterApplyDebounce) {
      clearTimeout(this.filterApplyDebounce);
      this.filterApplyDebounce = null;
    }
  }

  setupMessageListener() {
    this.log("ThreadsCommentFilter: Setting up message listener");
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.log("ThreadsCommentFilter: Received message:", message);

      switch (message.action) {
        case "ping":
          this.log("ThreadsCommentFilter: Responding to ping");
          sendResponse({ status: "ok" });
          break;
        case "updateSettings":
          this.log("ThreadsCommentFilter: Updating settings");
          this.settings = message.settings;
          this.debug = this.settings.debug || false; // Update debug mode

          // 清理 debounce timer
          this._clearFilterApplyDebounce();

          // Apply filters immediately for settings changes
          this.applyFiltersImmediate();

          // Update opacity for existing grayscale comments
          this.updateGrayscaleOpacity();
          this.updateBlurAmount();
          this.updateClickMode();
          break;
        case "applySettings":
          this.log("ThreadsCommentFilter: Applying settings manually");
          this.settings = message.settings;

          // 清理 debounce timer
          this._clearFilterApplyDebounce();

          // Apply filters immediately for manual settings application
          this.applyFiltersImmediate();
          break;
        case "getStats": {
          this.log("ThreadsCommentFilter: Sending stats");
          // Dynamically calculate total processed comments to ensure accuracy
          const totalProcessed = document.querySelectorAll(
            ".threads-filter-processed"
          ).length;
          this.log(
            `ThreadsCommentFilter: Total processed comments: ${totalProcessed}`
          );
          this.log(
            `ThreadsCommentFilter: Filtered comments set size: ${this.filteredComments.size}`
          );
          this.log(
            `ThreadsCommentFilter: Follower filtered: ${this.followerFilteredComments.size}`
          );
          this.log(
            `ThreadsCommentFilter: Avatar filtered: ${this.avatarFilteredComments.size}`
          );
          this.log(`ThreadsCommentFilter: Current settings:`, this.settings);
          sendResponse({
            totalCount: totalProcessed,
            filteredCount: this.filteredComments.size,
            followerFilteredCount: this.followerFilteredComments.size,
            avatarFilteredCount: this.avatarFilteredComments.size,
          });
          break;
        }
        case "restoreAll":
          this.log("ThreadsCommentFilter: Restoring all comments");
          this.restoreAllComments();
          break;
        case "toggleFollowerCount":
          this.log("ThreadsCommentFilter: Toggling follower count display");
          this.settings.showFollowerCount = !this.settings.showFollowerCount;
          this.log(
            `ThreadsCommentFilter: showFollowerCount is now: ${this.settings.showFollowerCount}`
          );
          this.updateFollowerCountVisibility();
          sendResponse({
            success: true,
            showFollowerCount: this.settings.showFollowerCount,
          });
          break;
        default:
          this.log(
            "ThreadsCommentFilter: Unknown message action:",
            message.action
          );
      }
    });
    this.log("ThreadsCommentFilter: Message listener setup complete");
  }

  startObserving() {
    // Stop existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Create new observer for dynamic content
    this.observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      let hasSignificantChanges = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Check if the added nodes are our own follower count elements
          const hasOurElements = Array.from(mutation.addedNodes).some(
            (node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                return (
                  node.classList.contains("threads-follower-count") ||
                  node.querySelector(".threads-follower-count") ||
                  node.classList.contains("threads-filter-processed") ||
                  node.querySelector(".threads-filter-processed")
                );
              }
              return false;
            }
          );

          // Check for significant changes (new comments, not just our own elements)
          const hasNewComments = Array.from(mutation.addedNodes).some(
            (node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Look for potential comment containers
                return (
                  node.querySelector('div[data-pressable-container="true"]') ||
                  node.querySelector('div[role="article"]') ||
                  node.querySelector('a[href*="/@"]')
                );
              }
              return false;
            }
          );

          // Only process if we don't have our own elements and have significant changes
          if (!hasOurElements && hasNewComments) {
            shouldProcess = true;
            hasSignificantChanges = true;
          } else if (!hasOurElements) {
            // Minor changes, still process but with lower priority
            shouldProcess = true;
          }
        }
      });

      if (shouldProcess) {
        // Debounce processing with different delays based on change type
        clearTimeout(this.processTimeout);
        const delay = hasSignificantChanges ? 300 : 1000; // Faster for significant changes
        this.processTimeout = setTimeout(() => {
          this.processExistingComments();
        }, delay);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  processExistingComments() {
    // Clean up any leftover hidden states before processing
    this.cleanupHiddenStates();

    // Find comment containers - updated selectors based on actual Threads structure
    const commentSelectors = [
      'div[data-pressable-container="true"]', // Main comment container
      ".x1ypdohk.x1n2onr6.xwag103.xrtyd2m.x1e9mfsr.xnrf12o.xz9dl7a", // Comment wrapper class
      ".x1a6qonq.x6ikm8r.x10wlt62.xj0a0fe.x126k92a.x6prxxf.x7r5mf7", // Comment text container
      'div[role="article"]', // Fallback for article role
    ];

    let comments = [];
    let totalElements = 0;

    commentSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      totalElements += elements.length;
      elements.forEach((element) => {
        if (this.isCommentElement(element)) {
          comments.push(element);
        }
      });
    });

    this.log(
      `Threads Filter: Found ${totalElements} potential elements, ${comments.length} confirmed comments`
    );

    comments.forEach((comment) => this.processComment(comment));

    // Log summary after processing all comments
    this.log(
      `Threads Filter: Successfully processed ${comments.length} comments`
    );

    this.applyFilters();
  }

  isDefaultAvatar(imgElement) {
    if (!imgElement || !imgElement.src) return true;

    const src = imgElement.src.toLowerCase();

    // Check for Threads/Instagram default avatar indicators
    const defaultIndicators = [
      "ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj", // Anonymous profile cache key (base64 encoded)
      "anonymou", // Partial match for anonymous
      "default_profile", // Default profile
      "no_profile", // No profile indicator
      "placeholder_profile", // Placeholder profile
      "anonymous_profile", // Anonymous profile
    ];

    // Check if URL contains any of the default indicators
    const isDefault = defaultIndicators.some((indicator) =>
      src.includes(indicator)
    );

    // More specific check: look for the exact anonymous profile pattern
    // The base64 string "YW5vbnltb3VzX3Byb2ZpbGVfcGlj" decodes to "anonymous_profile_pic"
    if (src.includes("ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj")) {
      return true;
    }

    // Check for other default avatar patterns
    if (
      src.includes("default_profile_pic") ||
      src.includes("anonymous_profile_pic") ||
      src.includes("placeholder_profile_pic")
    ) {
      return true;
    }

    // Additional check: look for specific file patterns that indicate default avatars
    // Default avatars often have specific file names or patterns
    if (
      src.includes("default_avatar") ||
      src.includes("anonymous_avatar") ||
      src.includes("placeholder_avatar")
    ) {
      return true;
    }

    // Check for the specific anonymous profile pattern in the URL
    // This is the most reliable indicator for anonymous/default profiles
    const anonymousPattern = /ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj/i;
    if (anonymousPattern.test(src)) {
      return true;
    }

    // Additional check: look for specific file IDs that are known to be default avatars
    // The file ID "464760996_1254146839119862_3605321457742435801_n" appears in default avatars
    if (src.includes("464760996_1254146839119862_3605321457742435801_n")) {
      return true;
    }

    // Log for debugging - only log when we think it's default or when we're unsure
    if (isDefault || src.includes("ig_cache_key=yw5vbnltb3vz")) {
      this.log("Avatar Check (Potential Default):", {
        src: src.substring(0, 100) + "...",
        isDefault,
        hasAnonymousKey: src.includes(
          "ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj"
        ),
        hasGenericAnonymousKey: src.includes("ig_cache_key=yw5vbnltb3vz"),
        hasAnonymousPattern: anonymousPattern.test(src),
        hasDefaultFileId: src.includes(
          "464760996_1254146839119862_3605321457742435801_n"
        ),
      });
    }

    return isDefault;
  }

  isCommentElement(element) {
    // Check if element looks like a comment based on Threads structure
    const hasText =
      element.querySelector(
        ".x1a6qonq.x6ikm8r.x10wlt62.xj0a0fe.x126k92a.x6prxxf.x7r5mf7"
      ) || element.querySelector('span[dir="auto"]');
    const hasAuthor =
      element.querySelector('a[href*="/@"]') ||
      element.querySelector('a[href*="/"]');

    // Check for avatar and determine if it's default
    const avatarImg =
      element.querySelector('img[alt*="大頭貼照"]') ||
      element.querySelector('img[alt*="profile"]') ||
      element.querySelector("img");
    const avatarDiv =
      element.querySelector('div[style*="background-image"]') ||
      element.querySelector(".x90nhty"); // Avatar container class

    // Determine if avatar exists and if it's default
    let hasAvatar = false;
    let isDefaultAvatar = false;

    if (avatarImg) {
      hasAvatar = true;
      isDefaultAvatar = this.isDefaultAvatar(avatarImg);
    } else if (avatarDiv) {
      hasAvatar = true;
      const style = avatarDiv.style.backgroundImage;
      isDefaultAvatar =
        !style || style.includes("default") || style.includes("placeholder");
    }

    const hasActionButtons = element.querySelector(
      'svg[aria-label*="讚"], svg[aria-label*="回覆"], svg[aria-label*="轉發"]'
    );

    const isProcessed = element.classList.contains("threads-filter-processed");
    const hasPressableContainer = element.closest(
      '[data-pressable-container="true"]'
    );

    // More flexible comment detection - doesn't require all elements
    const isComment =
      hasText &&
      hasAuthor &&
      hasActionButtons &&
      !isProcessed &&
      hasPressableContainer;

    // Store avatar info in element for later use
    if (isComment) {
      element.dataset.threadsHasAvatar = hasAvatar;
      element.dataset.threadsIsDefaultAvatar = isDefaultAvatar;
    }

    // Debug logging for first few elements
    if (Math.random() < 0.1) {
      // Log 10% of elements to avoid spam
      const avatarSrc = avatarImg ? avatarImg.src : "none";
      this.log("Threads Filter Debug:", {
        hasText: !!hasText,
        hasAuthor: !!hasAuthor,
        hasAvatar,
        isDefaultAvatar,
        avatarSrc:
          avatarSrc.substring(0, 100) + (avatarSrc.length > 100 ? "..." : ""), // Truncate long URLs
        hasActionButtons: !!hasActionButtons,
        isProcessed,
        hasPressableContainer: !!hasPressableContainer,
        isComment,
        element:
          element.tagName +
          (element.className ? "." + element.className.split(" ")[0] : ""),
      });
    }

    return isComment;
  }

  processComment(commentElement) {
    if (commentElement.classList.contains("threads-filter-processed")) {
      return;
    }

    commentElement.classList.add("threads-filter-processed");

    // Extract author information
    const authorInfo = this.extractAuthorInfo(commentElement);
    if (!authorInfo) return;

    // Extract comment content
    const contentElement =
      commentElement.querySelector(
        ".x1a6qonq.x6ikm8r.x10wlt62.xj0a0fe.x126k92a.x6prxxf.x7r5mf7 span"
      ) || commentElement.querySelector('span[dir="auto"]');
    const commentContent = contentElement
      ? contentElement.textContent.trim()
      : "No content found";

    // Log comment information
    if (authorInfo.hasDefaultAvatar) {
      this.log("Threads Filter - Comment Found:", {
        username: authorInfo.username,
        content:
          commentContent.substring(0, 100) +
          (commentContent.length > 100 ? "..." : ""),
        hasDefaultAvatar: authorInfo.hasDefaultAvatar,
        isVerified: authorInfo.isVerified,
        followerCount: authorInfo.followerCount,
      });
    }

    // Add follower count display (always call to update existing elements)
    if (authorInfo.followerCount !== null) {
      this.addFollowerCountDisplay(commentElement, authorInfo);
    }

    // Store comment data for filtering
    commentElement.dataset.threadsFilterData = JSON.stringify({
      followers: authorInfo.followerCount,
      isVerified: authorInfo.isVerified,
      hasDefaultAvatar: authorInfo.hasDefaultAvatar,
      username: authorInfo.username,
    });
  }

  extractAuthorInfo(commentElement) {
    const authorInfo = {
      username: null,
      followerCount: null,
      isVerified: false,
      hasDefaultAvatar: false,
    };

    // Extract username from href attribute
    const usernameLink = commentElement.querySelector('a[href*="/@"]');
    if (usernameLink) {
      const href = usernameLink.getAttribute("href");
      const match = href.match(/\/@([^/]+)/);
      if (match) {
        authorInfo.username = match[1];
      }
    }

    // Check for verification badge - look for verified icon or text
    const verificationBadge = commentElement.querySelector(
      '[aria-label*="Verified"], svg[aria-label*="Verified"], [aria-label*="已驗證"]'
    );
    authorInfo.isVerified = !!verificationBadge;

    // Use avatar info from isCommentElement if available, otherwise detect it
    if (commentElement.dataset.threadsIsDefaultAvatar !== undefined) {
      authorInfo.hasDefaultAvatar =
        commentElement.dataset.threadsIsDefaultAvatar === "true";
    } else {
      // Fallback detection if not already processed
      const avatarImg = commentElement.querySelector(
        'img[alt*="大頭貼照"], img[alt*="profile"], img'
      );
      const avatarDiv = commentElement.querySelector(
        'div[style*="background-image"]'
      );

      if (avatarImg) {
        authorInfo.hasDefaultAvatar = this.isDefaultAvatar(avatarImg);
      } else if (avatarDiv) {
        // Check if div has background image (default avatar)
        const style = avatarDiv.style.backgroundImage;
        authorInfo.hasDefaultAvatar =
          !style || style.includes("default") || style.includes("placeholder");
      } else {
        // No avatar found, consider it as default
        authorInfo.hasDefaultAvatar = true;
      }
    }

    // Extract follower count (this would need to be enhanced based on Threads API access)
    authorInfo.followerCount = this.extractFollowerCount(
      commentElement,
      authorInfo.username
    );

    return authorInfo;
  }

  extractFollowerCount(commentElement, username) {
    // Check cache first
    if (this.followerCache.has(username)) {
      return this.followerCache.get(username);
    }

    // Look for follower count in various possible locations
    const possibleElements = commentElement.querySelectorAll("span, div");

    for (const element of possibleElements) {
      const text = element.textContent.trim();

      // Look for patterns like "1.2K followers", "500 followers", etc.
      const followerMatch = text.match(
        /(\d+(?:\.\d+)?[KMB]?)\s*(?:followers?|following|位粉絲|フォロワー|팔로워|abonnés?|Follower|seguidores?|подписчиков?)/i
      );
      if (followerMatch) {
        const count = this.parseFollowerCount(followerMatch[1]);
        this.followerCache.set(username, count);
        return count;
      }
    }

    // If not found in DOM, try to fetch from user profile
    this.fetchFollowerCountFromProfile(username, commentElement);

    // Return null to indicate unknown (will be updated when fetch completes)
    return null;
  }

  async fetchFollowerCountFromProfile(username, commentElement) {
    try {
      this.log(`Fetching follower count for @${username}...`);

      // Fetch the user profile page
      const response = await fetch(`https://www.threads.com/@${username}`, {
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();

      // Parse the HTML to extract follower count
      const followerCount = this.extractFollowerCountFromHTML(html, username);

      if (followerCount !== null) {
        // Cache the result
        this.followerCache.set(username, followerCount);

        // Update the comment data - preserve existing avatar and verification status
        const data = commentElement.dataset.threadsFilterData;
        if (data) {
          const commentData = JSON.parse(data);
          commentData.followers = followerCount;
          commentElement.dataset.threadsFilterData =
            JSON.stringify(commentData);
        }

        // Update the display using addFollowerCountDisplay to respect current settings
        // Preserve the original avatar and verification status from the comment data
        const originalData = data ? JSON.parse(data) : {};
        this.addFollowerCountDisplay(commentElement, {
          username: username,
          followerCount: followerCount,
          isVerified: originalData.isVerified || false,
          hasDefaultAvatar: originalData.hasDefaultAvatar || false,
        });

        // Only re-apply filters for this specific comment, don't trigger full reprocessing
        this._reapplyFiltersForComment(commentElement);

        this.log(
          `Successfully fetched follower count for @${username}: ${followerCount}`
        );
      } else {
        this.log(
          `Could not find follower count for @${username} in profile page`
        );
      }
    } catch (error) {
      console.error(`Error fetching follower count for @${username}:`, error);
    }
  }

  extractFollowerCountFromHTML(html, username) {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Look for follower count in various patterns
    const patterns = [
      // Pattern 1: "34位粉絲" (Chinese)
      /(\d+(?:\.\d+)?[KMB]?)\s*位粉絲/i,
      // Pattern 2: "34 followers" (English)
      /(\d+(?:\.\d+)?[KMB]?)\s*followers?/i,
      // Pattern 3: "34フォロワー" (Japanese)
      /(\d+(?:\.\d+)?[KMB]?)\s*フォロワー/i,
      // Pattern 4: "34팔로워" (Korean)
      /(\d+(?:\.\d+)?[KMB]?)\s*팔로워/i,
      // Pattern 5: "34 abonnés" (French)
      /(\d+(?:\.\d+)?[KMB]?)\s*abonnés?/i,
      // Pattern 6: "34 Follower" (German)
      /(\d+(?:\.\d+)?[KMB]?)\s*Follower/i,
      // Pattern 7: "34 seguidores" (Spanish)
      /(\d+(?:\.\d+)?[KMB]?)\s*seguidores?/i,
      // Pattern 8: "34 подписчиков" (Russian)
      /(\d+(?:\.\d+)?[KMB]?)\s*подписчиков?/i,
      // Pattern 9: Look for specific DOM structure
      // This targets the specific structure you showed: <span title="34">34</span>位粉絲
      /<span[^>]*title="(\d+(?:\.\d+)?[KMB]?)"[^>]*>\1<\/span>\s*(?:位粉絲|followers?|フォロワー|팔로워|abonnés?|Follower|seguidores?|подписчиков?)/i,
    ];

    // Search in the entire HTML content
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const count = this.parseFollowerCount(match[1]);
        this.log(
          `Found follower count for @${username}: ${match[1]} -> ${count}`
        );
        return count;
      }
    }

    // Also try to find by DOM structure
    const followerElements = doc.querySelectorAll("span, div");
    for (const element of followerElements) {
      const text = element.textContent.trim();

      // Look for patterns like "34位粉絲", "1.2K followers", etc.
      const followerMatch = text.match(
        /(\d+(?:\.\d+)?[KMB]?)\s*(?:followers?|following|位粉絲|フォロワー|팔로워|abonnés?|Follower|seguidores?|подписчиков?)/i
      );
      if (followerMatch) {
        const count = this.parseFollowerCount(followerMatch[1]);
        this.log(
          `Found follower count in DOM for @${username}: ${followerMatch[1]} -> ${count}`
        );
        return count;
      }
    }

    return null;
  }

  updateFollowerCountDisplay(commentElement, followerCount) {
    // Remove any existing fetch buttons
    const fetchButton = commentElement.querySelector(
      ".threads-fetch-followers-btn"
    );
    if (fetchButton) {
      fetchButton.remove();
    }

    // Remove any existing follower count display
    const existingDisplay = commentElement.querySelector(
      ".threads-follower-count"
    );
    if (existingDisplay) {
      existingDisplay.remove();
    }

    // Only create new element if showFollowerCount is enabled
    if (!this.settings.showFollowerCount) return;

    // Find the time element to add follower count next to it
    const timeElement =
      commentElement.querySelector("time") ||
      commentElement.querySelector('abbr[aria-label*="前"]') ||
      commentElement.querySelector('abbr[aria-label*="ago"]');

    if (timeElement) {
      const followerCountElement = document.createElement("span");
      followerCountElement.className = "threads-follower-count";
      followerCountElement.textContent = ` • ${this.formatFollowerCount(
        followerCount
      )}${this.getFollowerSpacing()}${this.getMessage("followers")}`;
      followerCountElement.style.cssText = `
                color: #65676b;
                font-size: 0.9em;
                font-weight: normal;
                margin-left: 4px;
            `;

      // Insert after the time element
      const timeContainer =
        timeElement.closest("span") ||
        timeElement.closest("div") ||
        timeElement.parentNode;
      if (timeContainer) {
        timeContainer.insertBefore(
          followerCountElement,
          timeElement.nextSibling
        );
      } else {
        // Fallback: insert after the time element directly
        timeElement.parentNode.insertBefore(
          followerCountElement,
          timeElement.nextSibling
        );
      }
    } else {
      // Fallback: if no time element found, add to username area
      const authorNameElement =
        commentElement.querySelector('a[href*="/@"] span') ||
        commentElement.querySelector('a[href*="/@"]') ||
        commentElement.querySelector('a[href*="/"] span') ||
        commentElement.querySelector('a[href*="/"]');
      if (authorNameElement) {
        const followerCountElement = document.createElement("span");
        followerCountElement.className = "threads-follower-count";
        followerCountElement.textContent = ` (${this.formatFollowerCount(
          followerCount
        )})`;
        followerCountElement.style.cssText = `
                    color: #65676b;
                    font-size: 0.9em;
                    font-weight: normal;
                    margin-left: 4px;
                `;

        const authorContainer =
          authorNameElement.closest("span") ||
          authorNameElement.closest("div") ||
          authorNameElement.parentNode;
        if (authorContainer) {
          authorContainer.insertBefore(
            followerCountElement,
            authorNameElement.nextSibling
          );
        }
      }
    }
  }

  parseFollowerCount(countStr) {
    const multipliers = { K: 1000, M: 1000000, B: 1000000000 };
    const match = countStr.match(/^(\d+(?:\.\d+)?)([KMB]?)$/i);

    if (!match) return 0;

    const number = parseFloat(match[1]);
    const multiplier = multipliers[match[2] ? match[2].toUpperCase() : ""] || 1;

    return Math.floor(number * multiplier);
  }

  addFollowerCountDisplay(commentElement, authorInfo) {
    // Check if follower count already added
    const existingDisplay = commentElement.querySelector(
      ".threads-follower-count"
    );

    // If we have follower count, display it
    if (authorInfo.followerCount !== null) {
      // If follower count element already exists, just update its visibility
      if (existingDisplay) {
        existingDisplay.style.display = this.settings.showFollowerCount
          ? ""
          : "none";
        return;
      }

      // Only create new element if showFollowerCount is enabled
      if (!this.settings.showFollowerCount) return;

      // Find the time element to add follower count next to it
      const timeElement =
        commentElement.querySelector("time") ||
        commentElement.querySelector('abbr[aria-label*="前"]') ||
        commentElement.querySelector('abbr[aria-label*="ago"]');

      if (timeElement) {
        const followerCountElement = document.createElement("span");
        followerCountElement.className = "threads-follower-count";
        followerCountElement.textContent = ` • ${this.formatFollowerCount(
          authorInfo.followerCount
        )}${this.getFollowerSpacing()}${this.getMessage("followers")}`;
        followerCountElement.style.cssText = `
                    color: #65676b;
                    font-size: 0.9em;
                    font-weight: normal;
                    margin-left: 4px;
                `;

        // Insert after the time element
        const timeContainer =
          timeElement.closest("span") ||
          timeElement.closest("div") ||
          timeElement.parentNode;
        if (timeContainer) {
          timeContainer.insertBefore(
            followerCountElement,
            timeElement.nextSibling
          );
        } else {
          // Fallback: insert after the time element directly
          timeElement.parentNode.insertBefore(
            followerCountElement,
            timeElement.nextSibling
          );
        }
      } else {
        // Fallback: if no time element found, add to username area
        const authorNameElement =
          commentElement.querySelector('a[href*="/@"] span') ||
          commentElement.querySelector('a[href*="/@"]') ||
          commentElement.querySelector('a[href*="/"] span') ||
          commentElement.querySelector('a[href*="/"]');
        if (authorNameElement) {
          const followerCountElement = document.createElement("span");
          followerCountElement.className = "threads-follower-count";
          followerCountElement.textContent = ` (${this.formatFollowerCount(
            authorInfo.followerCount
          )})`;
          followerCountElement.style.cssText = `
                        color: #65676b;
                        font-size: 0.9em;
                        font-weight: normal;
                        margin-left: 4px;
                    `;

          const authorContainer =
            authorNameElement.closest("span") ||
            authorNameElement.closest("div") ||
            authorNameElement.parentNode;
          if (authorContainer) {
            authorContainer.insertBefore(
              followerCountElement,
              authorNameElement.nextSibling
            );
          }
        }
      }
    }
  }

  formatFollowerCount(count) {
    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(1) + "B";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  }

  applyFilters() {
    // Debounce filter application to prevent conflicts with Threads DOM updates
    const now = Date.now();
    if (now - this.lastFilterApply < 1000) {
      // Debounce within 1 second
      if (this.filterApplyDebounce) {
        clearTimeout(this.filterApplyDebounce);
      }
      this.filterApplyDebounce = setTimeout(() => {
        this.applyFilters();
      }, 1000);
      return;
    }

    this.lastFilterApply = now;
    this.applyFiltersImmediate();
  }

  applyFiltersImmediate() {
    if (!this.settings.enableFilter) {
      // When filter is disabled, show ALL comments regardless of their previous state
      const allProcessedComments = document.querySelectorAll(
        ".threads-filter-processed"
      );
      this.log(
        `Threads Filter: Filter disabled, showing all ${allProcessedComments.length} comments`
      );

      allProcessedComments.forEach((comment) => {
        this.removeFilterStyle(comment);
      });

      // Clear the filtered comments sets since we're not filtering anything
      this.filteredComments.clear();
      this.followerFilteredComments.clear();
      this.avatarFilteredComments.clear();

      // Still update follower count visibility
      this.updateFollowerCountVisibility();

      // Send updated stats to popup
      this.sendStatsToPopup();
      return;
    }

    // Handle follower count visibility
    this.updateFollowerCountVisibility();

    const processedComments = document.querySelectorAll(
      ".threads-filter-processed"
    );
    this.log(
      `Threads Filter: Applying filters to ${processedComments.length} processed comments`
    );

    // Track which comments should be filtered and which should not
    const commentsToFilter = new Set();
    const newFollowerFiltered = new Set();
    const newAvatarFiltered = new Set();

    // Determine which comments should be filtered
    processedComments.forEach((comment) => {
      const filterResult = this.shouldFilterComment(comment);

      if (filterResult.shouldFilter) {
        commentsToFilter.add(comment);

        // Track the reason for filtering
        if (filterResult.reason === "follower") {
          newFollowerFiltered.add(comment);
        } else if (filterResult.reason === "avatar") {
          newAvatarFiltered.add(comment);
        }
      }
    });

    // Apply changes only to comments that need state changes
    let stateChanges = 0;
    processedComments.forEach((comment) => {
      const shouldBeFiltered = commentsToFilter.has(comment);
      const isCurrentlyFiltered = this.filteredComments.has(comment);

      if (shouldBeFiltered && !isCurrentlyFiltered) {
        // Comment should be filtered but isn't currently filtered
        this.filteredComments.add(comment);
        this.applyFilterStyle(comment);
        stateChanges++;
      } else if (!shouldBeFiltered && isCurrentlyFiltered) {
        // Comment should be shown but is currently filtered
        this.filteredComments.delete(comment);
        this.removeFilterStyle(comment);
        stateChanges++;
      } else if (shouldBeFiltered && isCurrentlyFiltered) {
        // Comment is already filtered, but we need to re-apply the style in case display mode changed
        this.applyFilterStyle(comment);
      }
      // If comment state doesn't need to change, do nothing
    });

    // Update the filtered comments sets
    this.followerFilteredComments = newFollowerFiltered;
    this.avatarFilteredComments = newAvatarFiltered;

    this.log(
      `Threads Filter: Applied filters to ${commentsToFilter.size} comments out of ${processedComments.length} total (${stateChanges} state changes)`
    );
    this.log(
      `Threads Filter: Current filtered comments set size: ${this.filteredComments.size}`
    );
    this.log(
      `Threads Filter: Follower filtered: ${this.followerFilteredComments.size}`
    );
    this.log(
      `Threads Filter: Avatar filtered: ${this.avatarFilteredComments.size}`
    );

    // Send updated stats to popup
    this.sendStatsToPopup();
  }

  updateFollowerCountVisibility() {
    // Only target our own created elements with the specific class
    const threadsFollowerElements = document.querySelectorAll(
      ".threads-follower-count"
    );
    this.log(
      `Threads Filter: Found ${threadsFollowerElements.length} elements with .threads-follower-count class`
    );

    this.log(
      `Threads Filter: showFollowerCount setting is: ${this.settings.showFollowerCount}`
    );

    threadsFollowerElements.forEach((element) => {
      // const beforeDisplay = window.getComputedStyle(element).display;
      // this.log(
      //   `Threads Filter: Element ${
      //     index + 1
      //   } - before: display = "${beforeDisplay}"`
      // );
      // this.log(
      //   `Threads Filter: Element ${index + 1} - text: "${element.textContent}"`
      // );

      if (this.settings.showFollowerCount) {
        // Show the element
        element.style.setProperty("display", "", "important");
        element.style.setProperty("visibility", "visible", "important");
        element.style.setProperty("opacity", "1", "important");
      } else {
        // Hide the element
        element.style.setProperty("display", "none", "important");
        element.style.setProperty("visibility", "hidden", "important");
        element.style.setProperty("opacity", "0", "important");
      }

      // const afterDisplay = window.getComputedStyle(element).display;
      // this.log(
      //   `Threads Filter: Element ${
      //     index + 1
      //   } - after: display = "${afterDisplay}", should be ${
      //     this.settings.showFollowerCount ? "visible" : "hidden"
      //   }`
      // );
    });

    // Additional check: verify we're not affecting time elements
    const timeElements = document.querySelectorAll(
      'time, abbr[aria-label*="前"], abbr[aria-label*="ago"]'
    );
    this.log(
      `Threads Filter: Found ${timeElements.length} time elements (should remain unaffected)`
    );
    // timeElements.forEach((element) => {
    //   const display = window.getComputedStyle(element).display;
    //   this.log(
    //     `Threads Filter: Time element ${
    //       index + 1
    //     } - display = "${display}" (should be visible)`
    //   );
    // });
  }

  shouldFilterComment(commentElement) {
    const data = commentElement.dataset.threadsFilterData;
    if (!data) {
      this.log("Threads Filter: Comment has no filter data");
      return { shouldFilter: false };
    }

    const commentData = JSON.parse(data);

    // Check follower count filters - filter if followers is null or below minimum
    if (
      this.settings.minFollowers !== null &&
      (commentData.followers === null ||
        commentData.followers < this.settings.minFollowers)
    ) {
      this.log(
        `Threads Filter: Comment by @${commentData.username} filtered due to min followers (${commentData.followers} < ${this.settings.minFollowers})`
      );
      return { shouldFilter: true, reason: "follower" };
    }

    if (
      this.settings.maxFollowers !== null &&
      commentData.followers !== null &&
      commentData.followers > this.settings.maxFollowers
    ) {
      this.log(
        `Threads Filter: Comment filtered due to max followers (${commentData.followers} > ${this.settings.maxFollowers})`
      );
      return { shouldFilter: true, reason: "follower" };
    }

    // Check avatar filters
    if (this.settings.hideVerified && commentData.isVerified) {
      this.log("Threads Filter: Comment filtered due to verified account");
      return { shouldFilter: true, reason: "avatar" };
    }

    if (this.settings.hideDefaultAvatars && commentData.hasDefaultAvatar) {
      this.log("Threads Filter: Comment filtered due to default avatar");
      return { shouldFilter: true, reason: "avatar" };
    }

    return { shouldFilter: false };
  }

  // 提取重置隱藏動畫樣式的邏輯
  _resetHideAnimationStyles(commentElement) {
    commentElement.style.display = "";
    commentElement.style.opacity = "";
    commentElement.style.height = "";
    commentElement.style.overflow = "";
    commentElement.style.pointerEvents = "";
    commentElement.style.position = "";
    commentElement.style.visibility = "";
  }

  // Set of excluded container classes for blur logic
  static _excludedContainerClasses = new Set([
    "x1lliihq",
    "x1plvlek",
    "xryxfnj",
    "x1n2onr6",
    "x1ji0vk5",
    "x18bv5gf",
    "xi7mnp6",
    "x193iq5w",
    "xeuugli",
    "x1fj9vlw",
    "x13faqbe",
    "x1vvkbs",
    "x1s928wv",
    "xhkezso",
    "x1gmr53x",
    "x1cpjm7i",
    "x1fgarty",
    "x1943h6x",
    "x1i0vuye",
    "xjohtrz",
    "xo1l8bm",
    "xp07o12",
    "x1yc453h",
    "xat24cr",
    "xdj266r",
  ]);

  // Private helper to get blur target spans
  _getBlurTargetSpans(commentElement) {
    const excludedClasses = ThreadsCommentFilter._excludedContainerClasses;
    const textSpans = commentElement.querySelectorAll("span");
    return Array.from(textSpans).filter((span) => {
      const hasExcludedClass = Array.from(span.classList).some((cls) =>
        excludedClasses.has(cls)
      );
      // Only apply blur to spans that contain text and are likely content spans
      return (
        span.textContent &&
        span.textContent.trim() &&
        !span.children.length &&
        !span.classList.contains("threads-follower-count") && // Skip follower count
        !span.closest(
          'abbr[aria-label*="前"], abbr[aria-label*="ago"], time'
        ) && // Skip time elements
        !hasExcludedClass
      );
    });
  }

  applyFilterStyle(commentElement) {
    const username =
      this.extractAuthorInfo(commentElement)?.username || "unknown";
    this.log(
      `Threads Filter: Applying filter style to @${username}, mode: ${this.settings.displayMode}`
    );

    if (this.settings.displayMode === "hide") {
      if (this.settings.hideAnimation) {
        // Use a more stable approach for hide animation
        // Instead of relying on CSS transitions that can conflict with DOM updates
        commentElement.classList.add("threads-filter-hidden");

        // Use a more reliable method to hide the element
        // Set opacity to 0 and height to 0 to make it effectively invisible
        commentElement.style.opacity = "0";
        commentElement.style.height = "0";
        commentElement.style.overflow = "hidden";
        commentElement.style.pointerEvents = "none";

        // Remove the element from layout flow
        commentElement.style.position = "absolute";
        commentElement.style.visibility = "hidden";
      } else {
        // Hide comments instantly without animation
        commentElement.style.display = "none";
      }
    } else if (this.settings.displayMode === "grayscale") {
      // First, completely clear all hide animation styles to ensure proper transition
      commentElement.classList.remove("threads-filter-hidden", "hiding");

      // Reset所有隱藏動畫樣式
      this._resetHideAnimationStyles(commentElement);

      commentElement.classList.add("threads-filter-grayscale");
      // Apply custom opacity value
      commentElement.style.setProperty(
        "--threads-filter-opacity",
        this.settings.grayscaleOpacity || 0.3
      );

      // Apply blur effect to text spans if blur amount is greater than 0
      if (this.settings.blurAmount > 0) {
        commentElement.style.setProperty(
          "--threads-filter-blur",
          `${this.settings.blurAmount}px`
        );
        // Use helper to get target spans
        const targetSpans = this._getBlurTargetSpans(commentElement);
        targetSpans.forEach((span) => {
          span.style.filter = `blur(var(--threads-filter-blur, 0px))`;
        });
      }

      // Handle click mode
      if (this.settings.clickToShow) {
        commentElement.classList.add("click-mode");
        this.setupClickHandler(commentElement);
      } else {
        commentElement.classList.remove("click-mode");
        commentElement.classList.remove("showing");
        this.removeClickHandler(commentElement);
      }
    }
  }

  setupClickHandler(commentElement) {
    // Remove existing click handler to avoid duplicates
    this.removeClickHandler(commentElement);

    const clickHandler = (e) => {
      // Prevent event bubbling to avoid triggering other click events
      e.stopPropagation();

      // Toggle the showing state
      if (commentElement.classList.contains("showing")) {
        commentElement.classList.remove("showing");
      } else {
        commentElement.classList.add("showing");
      }

      this.log("Threads Filter: Toggled click mode for comment");
    };

    // Store the handler reference for later removal
    commentElement.dataset.threadsClickHandler = "true";
    commentElement.addEventListener("click", clickHandler);

    // Store the handler function for cleanup
    commentElement._threadsClickHandler = clickHandler;
  }

  removeClickHandler(commentElement) {
    if (commentElement._threadsClickHandler) {
      commentElement.removeEventListener(
        "click",
        commentElement._threadsClickHandler
      );
      delete commentElement._threadsClickHandler;
      delete commentElement.dataset.threadsClickHandler;
    }
  }

  removeFilterStyle(commentElement) {
    const username =
      this.extractAuthorInfo(commentElement)?.username || "unknown";
    this.log(`Threads Filter: Removing filter style from @${username}`);

    // Remove hiding animation classes first
    commentElement.classList.remove("threads-filter-hidden");
    commentElement.classList.remove("hiding");

    // Reset所有隱藏動畫樣式
    this._resetHideAnimationStyles(commentElement);

    commentElement.classList.remove("threads-filter-grayscale");
    commentElement.classList.remove("click-mode");
    commentElement.classList.remove("showing");
    commentElement.style.removeProperty("--threads-filter-opacity");
    commentElement.style.removeProperty("--threads-filter-blur");

    // Remove blur effects from text spans
    const targetSpans = this._getBlurTargetSpans(commentElement);
    targetSpans.forEach((span) => {
      if (span.style.filter && span.style.filter.includes("blur")) {
        span.style.filter = "";
      }
    });

    // Remove click handler if exists
    this.removeClickHandler(commentElement);

    this.followerFilteredComments.delete(commentElement);
    this.avatarFilteredComments.delete(commentElement);
  }

  restoreAllComments() {
    // Restore all processed comments, not just the ones in filteredComments set
    const allProcessedComments = document.querySelectorAll(
      ".threads-filter-processed"
    );
    this.log(
      `Threads Filter: Restoring all ${allProcessedComments.length} processed comments`
    );

    allProcessedComments.forEach((comment) => {
      this.removeFilterStyle(comment);
    });

    this.filteredComments.clear();
    this.followerFilteredComments.clear();
    this.avatarFilteredComments.clear();

    // Also update follower count visibility when restoring
    this.updateFollowerCountVisibility();

    // Send updated stats to popup
    this.sendStatsToPopup();
  }

  // Test function for avatar detection
  testAvatarDetection() {
    this.log("=== Testing Avatar Detection ===");

    const testUrls = [
      // Default avatar (should return true)
      "https://instagram.fsrg9-1.fna.fbcdn.net/v/t51.2885-19/464760996_1254146839119862_3605321457742435801_n.png?stp=dst-jpg_e0_s150x150_tt6&cb=8577c754-c2464923&_nc_ad=z-m&_nc_ht=instagram.fsrg9-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QGkCF4Djb2lE-4XmtQof25ydqTRu3Ip4QdTwoyrDlYlW-fW9VVtA8CwsX5UyENu3yO5HdKFhTDAGYRcuaUTyMoW&_nc_ohc=WKFg4N3-5TYQ7kNvwGUwFSq&_nc_gid=oapV7Fc4Ty9Vspb8-7wKLQ&edm=ALlQn9MBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5-cb8577c754-c2464923&oh=00_AfOwqz-DCzlzXDtR9Jp7WeB_5uDKEHs0c-5lMhA9Y_e_hA&oe=686DDC68&_nc_sid=e7f676",

      // Regular avatar (should return false)
      "https://instagram.ftpe8-1.fna.fbcdn.net/v/t51.2885-19/446968282_472881715152165_1298912135786301046_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.ftpe8-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QHR8ccIbfMezR4r-gJDxGjSmlxsyJ0pDnGdHmLtHrE1DzuoULvj3SWiSY_RqCGrHKE&_nc_ohc=6PdiZszYW_AQ7kNvwErtkr9&_nc_gid=6EGFAxOgNA5Mj_N95yySDg&edm=AEnw0QABAAAA&ccb=7-5&oh=00_AfNyXLGU8YNZt4TK4M4aWoQ0VK30zHf0tUvEcQCnnRlB-Q&oe=686DCF2D&_nc_sid=9705cc",

      // The problematic URL from the user (should return true - it IS a default avatar)
      "https://instagram.famd1-3.fna.fbcdn.net/v/t51.2885-19/464760996_1254146839119862_3605321457742435801_n.png?stp=dst-jpg_e0_s150x150_tt6&cb=8577c754-c2464923&_nc_ht=instagram.famd1-3.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QExCzQNCrjqpjp8zixOtu7IgAhC6eYCFjbZoJxr_W1mwJlyNSvwfE-qQs9GFDqpWpF_03ibHgZQcPSIdwhkRyzH&_nc_ohc=WKFg4N3-5TYQ7kNvwHKl-Wi&_nc_gid=pnADsHf1naNwekBVcTMEdw&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5-cb8577c754-c2464923&oh=00_AfPOoJwtDy9zjoFZTBGA_XKP-Rpiq7fRe01M-sNt6_pyLQ&oe=686DDC68&_nc_sid=65462d",
    ];

    testUrls.forEach((url, index) => {
      const testImg = document.createElement("img");
      testImg.src = url;
      const isDefault = this.isDefaultAvatar(testImg);
      this.log(`Test ${index + 1}:`, {
        url: url.substring(0, 80) + "...",
        isDefault,
        expected:
          index === 0
            ? "true (default)"
            : index === 1
              ? "false (regular)"
              : "true (default)",
        description:
          index === 0
            ? "Known default avatar"
            : index === 1
              ? "Known regular avatar"
              : "User reported avatar (technically default)",
        explanation:
          index === 2
            ? "This URL contains the default file ID (464760996_1254146839119862_3605321457742435801_n) and anonymous cache key, indicating it is technically a default avatar even if it looks different visually."
            : "",
      });
    });

    this.log("=== End Avatar Detection Test ===");
    this.log(
      "Note: The user-reported avatar is technically a default avatar because it contains:"
    );
    this.log(
      "1. Default file ID: 464760996_1254146839119862_3605321457742435801_n"
    );
    this.log(
      '2. Anonymous cache key: ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj (decodes to "anonymous_profile_pic")'
    );
    this.log(
      "These are Instagram's indicators for default/anonymous profile pictures."
    );
  }

  // Test function for follower count functionality
  testFollowerCountFeature() {
    this.log("=== Testing Follower Count Feature ===");

    // Test parseFollowerCount function
    const testCases = [
      { input: "34", expected: 34 },
      { input: "1.2K", expected: 1200 },
      { input: "500K", expected: 500000 },
      { input: "1.5M", expected: 1500000 },
      { input: "2.3B", expected: 2300000000 },
    ];

    testCases.forEach((testCase, index) => {
      const result = this.parseFollowerCount(testCase.input);
      const passed = result === testCase.expected;
      this.log(`Test ${index + 1}:`, {
        input: testCase.input,
        expected: testCase.expected,
        result,
        passed: passed ? "✅" : "❌",
      });
    });

    // Test formatFollowerCount function
    const formatTestCases = [
      { input: 34, expected: "34" },
      { input: 1200, expected: "1.2K" },
      { input: 500000, expected: "500.0K" },
      { input: 1500000, expected: "1.5M" },
      { input: 2300000000, expected: "2.3B" },
    ];

    formatTestCases.forEach((testCase, index) => {
      const result = this.formatFollowerCount(testCase.input);
      const passed = result === testCase.expected;
      this.log(`Format Test ${index + 1}:`, {
        input: testCase.input,
        expected: testCase.expected,
        result,
        passed: passed ? "✅" : "❌",
      });
    });

    this.log("=== End Follower Count Feature Test ===");
    this.log(
      "The extension will automatically fetch follower counts from user profiles."
    );
    this.log(
      "Look for follower counts displayed next to usernames in comments."
    );
  }

  // Test function to manually trigger follower count fetch
  testFetchFollowerCount(username) {
    this.log(`Testing follower count fetch for @${username}...`);

    // Create a temporary comment element for testing
    const tempElement = document.createElement("div");
    tempElement.dataset.threadsFilterData = JSON.stringify({
      followers: null,
      isVerified: false,
      hasDefaultAvatar: false,
      username: username,
    });

    this.fetchFollowerCountFromProfile(username, tempElement);
  }

  // Test function to verify follower count visibility toggle
  testFollowerCountVisibility() {
    this.log("=== Testing Follower Count Visibility Toggle ===");
    this.log(
      "Current showFollowerCount setting:",
      this.settings.showFollowerCount
    );

    // Find our specific follower count elements
    const followerCountElements = document.querySelectorAll(
      ".threads-follower-count"
    );
    this.log(
      `Found ${followerCountElements.length} follower count elements with .threads-follower-count class`
    );

    // Log their current display state
    followerCountElements.forEach((element, index) => {
      const display = window.getComputedStyle(element).display;
      this.log(
        `Follower element ${index + 1}: display = "${display}", should be ${
          this.settings.showFollowerCount ? "visible" : "hidden"
        }`
      );
    });

    // Test toggle
    const newSetting = !this.settings.showFollowerCount;
    this.log(
      `Toggling showFollowerCount from ${this.settings.showFollowerCount} to ${newSetting}`
    );
    this.settings.showFollowerCount = newSetting;

    // Update visibility
    this.updateFollowerCountVisibility();

    // Log new state
    this.log("After toggle:");
    followerCountElements.forEach((element, index) => {
      const display = window.getComputedStyle(element).display;
      this.log(
        `Follower element ${index + 1}: display = "${display}", should be ${
          this.settings.showFollowerCount ? "visible" : "hidden"
        }`
      );
    });

    this.log("=== End Follower Count Visibility Test ===");
  }

  // Test function to manually toggle follower count display
  testToggleFollowerCount() {
    this.log("=== Manual Follower Count Toggle Test ===");

    // Toggle the setting
    this.settings.showFollowerCount = !this.settings.showFollowerCount;
    this.log(
      `Toggled showFollowerCount to: ${this.settings.showFollowerCount}`
    );

    // Force update visibility
    this.updateFollowerCountVisibility();

    // Also try to re-process all comments to ensure follower counts are updated
    const processedComments = document.querySelectorAll(
      ".threads-filter-processed"
    );
    this.log(
      `Re-processing ${processedComments.length} comments to update follower counts`
    );

    processedComments.forEach((comment) => {
      const data = comment.dataset.threadsFilterData;
      if (data) {
        const commentData = JSON.parse(data);
        if (commentData.followers !== null) {
          this.addFollowerCountDisplay(comment, {
            username: commentData.username,
            followerCount: commentData.followers,
            isVerified: commentData.isVerified,
            hasDefaultAvatar: commentData.hasDefaultAvatar,
          });
        }
      }
    });

    this.log("=== End Manual Toggle Test ===");
  }

  // Debug function to check current follower count elements
  debugFollowerCountElements() {
    this.log("=== Debug Follower Count Elements ===");

    // Check our specific class elements
    const threadsFollowerElements = document.querySelectorAll(
      ".threads-follower-count"
    );
    this.log(
      `Found ${threadsFollowerElements.length} elements with .threads-follower-count class:`
    );
    threadsFollowerElements.forEach((element, index) => {
      const computedStyle = window.getComputedStyle(element);
      this.log(`Threads element ${index + 1}:`, {
        text: element.textContent,
        className: element.className,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
      });
    });

    // Check for time elements to make sure we're not affecting them
    const allSpans = document.querySelectorAll("span");
    const timeSpans = Array.from(allSpans).filter(
      (span) =>
        span.textContent &&
        (span.textContent.includes("小時") ||
          span.textContent.includes("分鐘") ||
          span.textContent.includes("天"))
    );
    this.log(
      `Found ${timeSpans.length} time-related spans (should not be affected):`
    );
    timeSpans.forEach((span, index) => {
      const computedStyle = window.getComputedStyle(span);
      this.log(`Time span ${index + 1}:`, {
        text: span.textContent,
        className: span.className,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
      });
    });

    // Also check time elements directly
    const timeElements = document.querySelectorAll(
      'time, abbr[aria-label*="前"], abbr[aria-label*="ago"]'
    );
    this.log(
      `Found ${timeElements.length} time elements (should remain unaffected):`
    );
    timeElements.forEach((element, index) => {
      const computedStyle = window.getComputedStyle(element);
      this.log(`Time element ${index + 1}:`, {
        text: element.textContent,
        tagName: element.tagName,
        className: element.className,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
      });
    });

    this.log("Current settings:", this.settings);
    this.log("=== End Debug ===");
  }

  // Test function to specifically test hiding only follower count text
  testHideOnlyFollowers() {
    this.log("=== Test Hide Only Followers Text ===");

    // Find our specific follower count elements
    const followerCountElements = document.querySelectorAll(
      ".threads-follower-count"
    );
    this.log(
      `Found ${followerCountElements.length} follower count elements with .threads-follower-count class`
    );

    // Find time elements to verify they're not affected
    const timeElements = document.querySelectorAll(
      'time, abbr[aria-label*="前"], abbr[aria-label*="ago"]'
    );
    this.log(
      `Found ${timeElements.length} time elements (should remain visible)`
    );

    // Test hiding followers
    this.log("Testing hide followers...");
    this.settings.showFollowerCount = false;
    this.updateFollowerCountVisibility();

    // Check results
    this.log("After hiding:");
    followerCountElements.forEach((element, index) => {
      const display = window.getComputedStyle(element).display;
      this.log(
        `Follower element ${
          index + 1
        }: display = "${display}" (should be "none")`
      );
    });

    timeElements.forEach((element, index) => {
      const display = window.getComputedStyle(element).display;
      this.log(
        `Time element ${index + 1}: display = "${display}" (should be visible)`
      );
    });

    // Test showing followers
    this.log("Testing show followers...");
    this.settings.showFollowerCount = true;
    this.updateFollowerCountVisibility();

    // Check results
    this.log("After showing:");
    followerCountElements.forEach((element, index) => {
      const display = window.getComputedStyle(element).display;
      this.log(
        `Follower element ${
          index + 1
        }: display = "${display}" (should be visible)`
      );
    });

    this.log("=== End Test ===");
  }

  sendStatsToPopup() {
    // Debounce rapid stats updates (within 1000ms)
    const now = Date.now();
    if (now - this.lastStatsUpdate < 1000) {
      if (this.statsUpdateDebounce) {
        clearTimeout(this.statsUpdateDebounce);
      }
      this.statsUpdateDebounce = setTimeout(() => {
        this.sendStatsToPopup();
      }, 1000);
      return;
    }

    this.lastStatsUpdate = now;

    // Send stats to popup if it's open
    try {
      // Dynamically calculate total processed comments to ensure accuracy
      const totalProcessed = document.querySelectorAll(
        ".threads-filter-processed"
      ).length;

      const stats = {
        totalCount: totalProcessed,
        filteredCount: this.filteredComments.size,
        followerFilteredCount: this.followerFilteredComments.size,
        avatarFilteredCount: this.avatarFilteredComments.size,
      };

      this.log("Threads Filter: Sending stats to popup:", stats);

      chrome.runtime.sendMessage({
        action: "updateStats",
        stats: stats,
      });
    } catch (error) {
      // Popup might not be open, which is normal
      this.log(
        "Threads Filter: Could not send stats to popup (popup may not be open):",
        error
      );
    }
  }

  // Update grayscale opacity for existing grayscale comments when the setting changes
  updateGrayscaleOpacity() {
    const processedComments = document.querySelectorAll(
      ".threads-filter-grayscale"
    );
    processedComments.forEach((comment) => {
      comment.style.setProperty(
        "--threads-filter-opacity",
        this.settings.grayscaleOpacity || 0.3
      );
    });
  }

  // Update blur amount for existing grayscale comments when the setting changes
  updateBlurAmount() {
    const processedComments = document.querySelectorAll(
      ".threads-filter-grayscale"
    );
    processedComments.forEach((comment) => {
      // Update CSS custom property for blur amount
      if (this.settings.blurAmount > 0) {
        comment.style.setProperty(
          "--threads-filter-blur",
          `${this.settings.blurAmount}px`
        );
      } else {
        comment.style.removeProperty("--threads-filter-blur");
      }
      // Use helper to get target spans
      const targetSpans = this._getBlurTargetSpans(comment);
      targetSpans.forEach((span) => {
        if (this.settings.blurAmount > 0) {
          span.style.filter = `blur(var(--threads-filter-blur, 0px))`;
        } else {
          span.style.filter = "";
        }
      });
    });
  }

  // Update click mode for existing grayscale comments when the setting changes
  updateClickMode() {
    const processedComments = document.querySelectorAll(
      ".threads-filter-grayscale"
    );
    processedComments.forEach((comment) => {
      if (this.settings.clickToShow) {
        comment.classList.add("click-mode");
        this.setupClickHandler(comment);
      } else {
        comment.classList.remove("click-mode");
        comment.classList.remove("showing");
        this.removeClickHandler(comment);
      }
    });
  }

  // Clean up any leftover hidden states from previous sessions
  cleanupHiddenStates() {
    // Debounce cleanup operations to prevent excessive calls
    const now = Date.now();
    if (now - this.lastCleanupTime < 2000) {
      // Only cleanup every 2 seconds
      return;
    }
    this.lastCleanupTime = now;

    this.log("ThreadsCommentFilter: Cleaning up hidden states...");

    // Clean up processed comments with hidden states
    const processedComments = document.querySelectorAll(
      ".threads-filter-processed"
    );
    let cleanedProcessed = 0;
    processedComments.forEach((comment) => {
      if (
        comment.classList.contains("threads-filter-hidden") ||
        comment.classList.contains("threads-filter-grayscale") ||
        comment.style.display === "none"
      ) {
        // 檢查這個評論是否應該被隱藏
        const filterResult = this.shouldFilterComment(comment);
        const shouldBeHidden = filterResult.shouldFilter;
        const username = this.extractAuthorInfo(comment)?.username || "unknown";

        this.log(
          `ThreadsCommentFilter: Checking @${username}, should be hidden: ${shouldBeHidden}, reason: ${filterResult.reason || "none"}`
        );

        // 只有不該被隱藏的評論才移除隱藏樣式
        if (!shouldBeHidden) {
          this.log(
            `ThreadsCommentFilter: Cleaning up hidden comment @${username}, classes: [${Array.from(comment.classList).join(", ")}], display: ${comment.style.display}`
          );
          this.removeFilterStyle(comment);
          cleanedProcessed++;
        } else {
          this.log(
            `ThreadsCommentFilter: Keeping @${username} hidden (should be hidden)`
          );
        }
      }
    });

    // Also clean up any elements that might have been hidden but not processed yet
    const hiddenElements = document.querySelectorAll(
      ".threads-filter-hidden, .threads-filter-grayscale"
    );
    let cleanedHidden = 0;
    hiddenElements.forEach((element) => {
      if (!element.classList.contains("threads-filter-processed")) {
        this.removeFilterStyle(element);
        cleanedHidden++;
      }
    });

    if (cleanedProcessed > 0 || cleanedHidden > 0) {
      this.log(
        `ThreadsCommentFilter: Cleaned up ${cleanedProcessed} processed comments and ${cleanedHidden} hidden elements`
      );
    }
  }

  // Cleanup method to clear timers and observers
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.statsUpdateDebounce) {
      clearTimeout(this.statsUpdateDebounce);
      this.statsUpdateDebounce = null;
    }
    if (this.filterApplyDebounce) {
      clearTimeout(this.filterApplyDebounce);
      this.filterApplyDebounce = null;
    }
  }

  // Test function to verify internationalization
  testInternationalization() {
    this.log("=== Testing Internationalization ===");

    // Test different languages
    const testLanguages = [
      { lang: "en", expected: "followers" },
      { lang: "zh_TW", expected: "位粉絲" },
      { lang: "zh_CN", expected: "位粉絲" },
      { lang: "ja", expected: "フォロワー" },
      { lang: "ko", expected: "팔로워" },
      { lang: "fr", expected: "abonnés" },
      { lang: "de", expected: "Follower" },
      { lang: "es", expected: "seguidores" },
      { lang: "ru", expected: "подписчиков" },
    ];

    testLanguages.forEach(({ lang, expected }) => {
      // Temporarily set the detected language
      const originalGetUILanguage = chrome.i18n.getUILanguage;
      chrome.i18n.getUILanguage = () => lang;

      const result = this.getMessage("followers");
      const passed = result === expected;

      this.log(`Language ${lang}:`, {
        expected,
        result,
        passed: passed ? "✅" : "❌",
      });

      // Restore original function
      chrome.i18n.getUILanguage = originalGetUILanguage;
    });

    this.log("=== End Internationalization Test ===");
  }

  // Helper method to get appropriate spacing for different languages
  getFollowerSpacing() {
    try {
      const detectedLang =
        chrome.i18n.getUILanguage() || navigator.language || "en";
      const langCode = detectedLang.split("-")[0];

      if (SPACE_LANGUAGES.includes(langCode)) {
        return " ";
      } else if (NO_SPACE_LANGUAGES.includes(langCode)) {
        return "";
      } else {
        // Default to space for unknown languages
        return " ";
      }
    } catch {
      // Default to space if language detection fails
      return " ";
    }
  }

  // Test function to verify spacing functionality
  testFollowerSpacing() {
    this.log("=== Testing Follower Spacing ===");

    // Test different languages and their expected spacing
    const testCases = [
      { lang: "en", expected: " ", description: "English - should have space" },
      {
        lang: "zh_TW",
        expected: "",
        description: "Traditional Chinese - no space",
      },
      {
        lang: "zh_CN",
        expected: "",
        description: "Simplified Chinese - no space",
      },
      { lang: "ja", expected: "", description: "Japanese - no space" },
      { lang: "ko", expected: "", description: "Korean - no space" },
      { lang: "fr", expected: " ", description: "French - should have space" },
      { lang: "de", expected: " ", description: "German - should have space" },
      { lang: "es", expected: " ", description: "Spanish - should have space" },
      { lang: "ru", expected: "", description: "Russian - no space" },
      { lang: "ar", expected: "", description: "Arabic - no space" },
      { lang: "th", expected: "", description: "Thai - no space" },
      { lang: "vi", expected: "", description: "Vietnamese - no space" },
    ];

    testCases.forEach(({ lang, expected, description }) => {
      // Temporarily set the detected language
      const originalGetUILanguage = chrome.i18n.getUILanguage;
      chrome.i18n.getUILanguage = () => lang;

      const result = this.getFollowerSpacing();
      const passed = result === expected;

      this.log(`Language ${lang}:`, {
        expected: `"${expected}"`,
        result: `"${result}"`,
        passed: passed ? "✅" : "❌",
        description,
      });

      // Restore original function
      chrome.i18n.getUILanguage = originalGetUILanguage;
    });

    // Test complete follower count display
    this.log("=== Testing Complete Follower Display ===");
    const testCount = 7099;
    const testLanguages = ["en", "zh_TW", "ja", "fr"];

    testLanguages.forEach((lang) => {
      const originalGetUILanguage = chrome.i18n.getUILanguage;
      chrome.i18n.getUILanguage = () => lang;

      const spacing = this.getFollowerSpacing();
      const followerText = this.getMessage("followers");
      const formattedCount = this.formatFollowerCount(testCount);
      const completeDisplay = ` • ${formattedCount}${spacing}${followerText}`;

      this.log(`Complete display for ${lang}:`, {
        count: testCount,
        formattedCount,
        spacing: `"${spacing}"`,
        followerText,
        completeDisplay,
      });

      chrome.i18n.getUILanguage = originalGetUILanguage;
    });

    this.log("=== End Spacing Test ===");
  }

  // Private method to reapply filters for a specific comment without triggering full reprocessing
  _reapplyFiltersForComment(commentElement) {
    if (!this.settings.enableFilter) {
      // When filter is disabled, show the comment
      this.removeFilterStyle(commentElement);
      return;
    }

    // Check if this comment should be filtered
    const filterResult = this.shouldFilterComment(commentElement);
    const shouldBeFiltered = filterResult.shouldFilter;
    const isCurrentlyFiltered = this.filteredComments.has(commentElement);

    // Only log and apply changes if the state actually needs to change
    if (shouldBeFiltered && !isCurrentlyFiltered) {
      // Comment should be filtered but isn't currently filtered
      this.filteredComments.add(commentElement);
      this.applyFilterStyle(commentElement);

      // Update the filtered comments sets
      if (filterResult.reason === "follower") {
        this.followerFilteredComments.add(commentElement);
      } else if (filterResult.reason === "avatar") {
        this.avatarFilteredComments.add(commentElement);
      }

      this.log(
        `Threads Filter: Comment state changed to filtered (${filterResult.reason})`
      );
    } else if (!shouldBeFiltered && isCurrentlyFiltered) {
      // Comment should be shown but is currently filtered
      this.filteredComments.delete(commentElement);
      this.removeFilterStyle(commentElement);

      // Remove from filtered sets
      this.followerFilteredComments.delete(commentElement);
      this.avatarFilteredComments.delete(commentElement);

      this.log(`Threads Filter: Comment state changed to visible`);
    } else if (shouldBeFiltered && isCurrentlyFiltered) {
      // Comment is already filtered, but we need to re-apply the style in case display mode changed
      this.applyFilterStyle(commentElement);
      // Don't log this case as it's just a style refresh
    }
    // If comment state doesn't need to change, do nothing

    // Send updated stats to popup
    this.sendStatsToPopup();
  }
}

// Initialize the extension only once
if (!window.threadsCommentFilter) {
  const threadsCommentFilter = new ThreadsCommentFilter();
  window.threadsCommentFilter = threadsCommentFilter;

  // Expose test functions globally
  window.testAvatarDetection = () =>
    window.threadsCommentFilter.testAvatarDetection();
  window.testFollowerCountFeature = () =>
    window.threadsCommentFilter.testFollowerCountFeature();
  window.testFetchFollowerCount = (username) =>
    window.threadsCommentFilter.testFetchFollowerCount(username);
  window.testFollowerCountVisibility = () =>
    window.threadsCommentFilter.testFollowerCountVisibility();
  window.testToggleFollowerCount = () =>
    window.threadsCommentFilter.testToggleFollowerCount();
  window.debugFollowerCountElements = () =>
    window.threadsCommentFilter.debugFollowerCountElements();
  window.testHideOnlyFollowers = () =>
    window.threadsCommentFilter.testHideOnlyFollowers();
  window.testInternationalization = () =>
    window.threadsCommentFilter.testInternationalization();
  window.testFollowerSpacing = () =>
    window.threadsCommentFilter.testFollowerSpacing();

  // Additional test functions
  window.testExtensionStatus = () => {
    console.log("=== Extension Status Test ===");
    console.log(
      "window.threadsCommentFilter exists:",
      !!window.threadsCommentFilter
    );
    console.log(
      "window.testInternationalization exists:",
      !!window.testInternationalization
    );
    console.log(
      "window.testFollowerSpacing exists:",
      !!window.testFollowerSpacing
    );

    if (window.threadsCommentFilter) {
      console.log("Extension is loaded and ready!");
      console.log("Available test functions:");
      console.log("- testAvatarDetection()");
      console.log("- testFollowerCountFeature()");
      console.log("- testFetchFollowerCount(username)");
      console.log("- testFollowerCountVisibility()");
      console.log("- testToggleFollowerCount()");
      console.log("- debugFollowerCountElements()");
      console.log("- testHideOnlyFollowers()");
      console.log("- testInternationalization()");
      console.log("- testFollowerSpacing()");
    } else {
      console.log(
        "Extension not loaded yet. Please wait a moment and try again."
      );
    }
    console.log("=== End Status Test ===");
  };

  window.quickTest = () => {
    console.log("=== Quick Test ===");

    // Test if we can access the extension
    if (window.threadsCommentFilter) {
      console.log("✅ Extension loaded successfully");

      // Test internationalization
      try {
        const result = window.threadsCommentFilter.getMessage("followers");
        console.log("✅ Internationalization test:", result);
      } catch (error) {
        console.log("❌ Internationalization test failed:", error);
      }

      // Test spacing
      try {
        const spacing = window.threadsCommentFilter.getFollowerSpacing();
        console.log("✅ Spacing test:", `"${spacing}"`);
      } catch (error) {
        console.log("❌ Spacing test failed:", error);
      }

      // Test complete display
      try {
        const count = 7099;
        const formattedCount =
          window.threadsCommentFilter.formatFollowerCount(count);
        const spacing = window.threadsCommentFilter.getFollowerSpacing();
        const followerText =
          window.threadsCommentFilter.getMessage("followers");
        const completeDisplay = ` • ${formattedCount}${spacing}${followerText}`;
        console.log("✅ Complete display test:", completeDisplay);
      } catch (error) {
        console.log("❌ Complete display test failed:", error);
      }
    } else {
      console.log("❌ Extension not loaded yet");
      console.log("Please wait a moment and try again, or reload the page");
      console.log("You can also try: checkExtension()");
    }

    console.log("=== End Quick Test ===");
  };

  window.checkExtension = () => {
    console.log("=== Extension Check ===");
    console.log(
      "window.threadsCommentFilter exists:",
      !!window.threadsCommentFilter
    );
    console.log("window.quickTest exists:", !!window.quickTest);
    console.log(
      "window.testInternationalization exists:",
      !!window.testInternationalization
    );
    console.log(
      "window.testFollowerSpacing exists:",
      !!window.testFollowerSpacing
    );

    if (window.threadsCommentFilter) {
      console.log("✅ Extension is loaded and ready!");
      console.log("Available test functions:");
      console.log("- quickTest()");
      console.log("- testExtensionStatus()");
      console.log("- testInternationalization()");
      console.log("- testFollowerSpacing()");
      console.log("- testFollowerCountFeature()");
      console.log("- testFollowerCountVisibility()");
      console.log("- testToggleFollowerCount()");
      console.log("- debugFollowerCountElements()");
      console.log("- testHideOnlyFollowers()");
      console.log("- testAvatarDetection()");
      console.log("- testFetchFollowerCount(username)");
    } else {
      console.log("❌ Extension not loaded yet");
      console.log("Please wait a moment and try again");
      console.log("If the problem persists, try:");
      console.log("1. Reload the page");
      console.log(
        "2. Check if the extension is enabled in chrome://extensions/"
      );
      console.log("3. Make sure you're on a Threads page");
    }

    console.log("=== End Extension Check ===");
  };

  window.simpleTest = () => {
    console.log("=== Simple Test ===");

    // Test basic functionality without requiring extension
    console.log("Testing basic functionality...");

    // Test if we're on a Threads page
    const isThreadsPage = window.location.hostname.includes("threads.com");
    console.log("On Threads page:", isThreadsPage);

    // Test if extension is loaded
    const extensionLoaded = !!window.threadsCommentFilter;
    console.log("Extension loaded:", extensionLoaded);

    // Test if test functions are available
    const quickTestAvailable = !!window.quickTest;
    const checkExtensionAvailable = !!window.checkExtension;
    console.log("quickTest available:", quickTestAvailable);
    console.log("checkExtension available:", checkExtensionAvailable);

    if (extensionLoaded) {
      console.log("✅ Extension is working!");
      console.log("Try: quickTest() or testInternationalization()");
    } else {
      console.log("❌ Extension not loaded");
      console.log("Try: checkExtension() to see what's available");
      console.log("Or wait a moment and try again");
    }

    console.log("=== End Simple Test ===");
  };

  window.testI18nNow = () => {
    console.log("=== Testing Internationalization Now ===");

    // Test basic language detection
    const browserLang = navigator.language || "en";
    const chromeLang = chrome?.i18n?.getUILanguage?.() || browserLang;
    console.log("Browser language:", browserLang);
    console.log("Chrome UI language:", chromeLang);

    // Test if we can access Chrome i18n API
    try {
      if (chrome?.i18n?.getMessage) {
        const message = chrome.i18n.getMessage("followers");
        console.log("Chrome i18n message:", message);
      } else {
        console.log("Chrome i18n API not available");
      }
    } catch (error) {
      console.log("Chrome i18n API error:", error);
    }

    // Test language-specific spacing logic
    const langCode = browserLang.split("-")[0];

    let expectedSpacing = " ";
    if (NO_SPACE_LANGUAGES.includes(langCode)) {
      expectedSpacing = "";
    }

    console.log("Language code:", langCode);
    console.log("Expected spacing:", `"${expectedSpacing}"`);
    console.log(
      "Space languages include this:",
      SPACE_LANGUAGES.includes(langCode)
    );
    console.log(
      "No-space languages include this:",
      NO_SPACE_LANGUAGES.includes(langCode)
    );

    // Test if extension is available
    if (window.threadsCommentFilter) {
      console.log("✅ Extension is loaded!");
      try {
        const actualSpacing = window.threadsCommentFilter.getFollowerSpacing();
        const actualMessage =
          window.threadsCommentFilter.getMessage("followers");
        console.log("Extension spacing:", `"${actualSpacing}"`);
        console.log("Extension message:", actualMessage);
        console.log(
          "Spacing matches expected:",
          actualSpacing === expectedSpacing
        );
      } catch (error) {
        console.log("Extension test failed:", error);
      }
    } else {
      console.log("❌ Extension not loaded yet");
    }

    console.log("=== End I18n Test ===");
  };
}

// Cleanup when page is unloaded
window.addEventListener("beforeunload", () => {
  if (window.threadsCommentFilter) {
    window.threadsCommentFilter.cleanup();
  }
});
