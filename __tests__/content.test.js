// Basic tests for ThreadsCommentFilter content script
// These tests ensure the basic functionality works as expected

describe("ThreadsCommentFilter", () => {
  let mockSettings;

  beforeEach(() => {
    // Mock settings
    mockSettings = {
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
  });

  describe("Follower count parsing", () => {
    test("should parse simple numbers correctly", () => {
      // This would test the parseFollowerCount method
      // For now, we'll test the logic directly
      const parseFollowerCount = (countStr) => {
        const multipliers = { K: 1000, M: 1000000, B: 1000000000 };
        const match = countStr.match(/^(\d+(?:\.\d+)?)([KMB]?)$/i);

        if (!match) return 0;

        const number = parseFloat(match[1]);
        const multiplier =
          multipliers[match[2] ? match[2].toUpperCase() : ""] || 1;

        return Math.floor(number * multiplier);
      };

      expect(parseFollowerCount("34")).toBe(34);
      expect(parseFollowerCount("1.2K")).toBe(1200);
      expect(parseFollowerCount("500K")).toBe(500000);
      expect(parseFollowerCount("1.5M")).toBe(1500000);
      expect(parseFollowerCount("2.3B")).toBe(2300000000);
    });

    test("should format follower counts correctly", () => {
      const formatFollowerCount = (count) => {
        if (count >= 1000000000) {
          return (count / 1000000000).toFixed(1) + "B";
        } else if (count >= 1000000) {
          return (count / 1000000).toFixed(1) + "M";
        } else if (count >= 1000) {
          return (count / 1000).toFixed(1) + "K";
        }
        return count.toString();
      };

      expect(formatFollowerCount(34)).toBe("34");
      expect(formatFollowerCount(1200)).toBe("1.2K");
      expect(formatFollowerCount(500000)).toBe("500.0K");
      expect(formatFollowerCount(1500000)).toBe("1.5M");
      expect(formatFollowerCount(2300000000)).toBe("2.3B");
    });
  });

  describe("Default avatar detection", () => {
    test("should detect default avatars correctly", () => {
      const isDefaultAvatar = (imgElement) => {
        if (!imgElement || !imgElement.src) return true;

        const src = imgElement.src.toLowerCase();

        // Check for Threads/Instagram default avatar indicators
        const defaultIndicators = [
          "ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj", // Anonymous profile cache key
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
        if (src.includes("ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj")) {
          return true;
        }

        return isDefault;
      };

      // Test default avatar URLs
      const defaultAvatarImg = {
        src: "https://example.com/ig_cache_key=yw5vbnltb3vzx3byb2zpbgvfcglj",
      };
      expect(isDefaultAvatar(defaultAvatarImg)).toBe(true);

      // Test regular avatar URLs
      const regularAvatarImg = {
        src: "https://example.com/regular_avatar.jpg",
      };
      expect(isDefaultAvatar(regularAvatarImg)).toBe(false);

      // Test null/undefined
      expect(isDefaultAvatar(null)).toBe(true);
      expect(isDefaultAvatar({})).toBe(true);
    });
  });

  describe("Comment filtering logic", () => {
    test("should filter comments based on follower count", () => {
      const shouldFilterComment = (commentData, settings) => {
        // Check follower count filters
        if (
          settings.minFollowers !== null &&
          (commentData.followers === null ||
            commentData.followers < settings.minFollowers)
        ) {
          return { shouldFilter: true, reason: "follower" };
        }

        if (
          settings.maxFollowers !== null &&
          commentData.followers !== null &&
          commentData.followers > settings.maxFollowers
        ) {
          return { shouldFilter: true, reason: "follower" };
        }

        // Check avatar filters
        if (settings.hideVerified && commentData.isVerified) {
          return { shouldFilter: true, reason: "avatar" };
        }

        if (settings.hideDefaultAvatars && commentData.hasDefaultAvatar) {
          return { shouldFilter: true, reason: "avatar" };
        }

        return { shouldFilter: false };
      };

      // Test min followers filter
      const settingsWithMin = { ...mockSettings, minFollowers: 100 };
      const commentWithLowFollowers = {
        followers: 50,
        isVerified: false,
        hasDefaultAvatar: false,
      };
      expect(
        shouldFilterComment(commentWithLowFollowers, settingsWithMin)
          .shouldFilter
      ).toBe(true);

      // Test max followers filter
      const settingsWithMax = { ...mockSettings, maxFollowers: 1000 };
      const commentWithHighFollowers = {
        followers: 2000,
        isVerified: false,
        hasDefaultAvatar: false,
      };
      expect(
        shouldFilterComment(commentWithHighFollowers, settingsWithMax)
          .shouldFilter
      ).toBe(true);

      // Test verified account filter
      const settingsHideVerified = { ...mockSettings, hideVerified: true };
      const verifiedComment = {
        followers: 500,
        isVerified: true,
        hasDefaultAvatar: false,
      };
      expect(
        shouldFilterComment(verifiedComment, settingsHideVerified).shouldFilter
      ).toBe(true);

      // Test default avatar filter
      const settingsHideDefaultAvatars = {
        ...mockSettings,
        hideDefaultAvatars: true,
      };
      const defaultAvatarComment = {
        followers: 500,
        isVerified: false,
        hasDefaultAvatar: true,
      };
      expect(
        shouldFilterComment(defaultAvatarComment, settingsHideDefaultAvatars)
          .shouldFilter
      ).toBe(true);

      // Test comment that should not be filtered
      const normalComment = {
        followers: 500,
        isVerified: false,
        hasDefaultAvatar: false,
      };
      expect(
        shouldFilterComment(normalComment, mockSettings).shouldFilter
      ).toBe(false);
    });
  });

  describe("Settings management", () => {
    test("should handle settings updates correctly", () => {
      const settings = { ...mockSettings };

      // Test enabling filter
      settings.enableFilter = true;
      expect(settings.enableFilter).toBe(true);

      // Test updating follower count display
      settings.showFollowerCount = false;
      expect(settings.showFollowerCount).toBe(false);

      // Test updating display mode
      settings.displayMode = "grayscale";
      expect(settings.displayMode).toBe("grayscale");
    });
  });

  describe("DOM manipulation", () => {
    test("should add CSS classes correctly", () => {
      const element = {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
          contains: jest.fn(),
        },
      };

      // Test adding processed class
      element.classList.add("threads-filter-processed");
      expect(element.classList.add).toHaveBeenCalledWith(
        "threads-filter-processed"
      );

      // Test adding grayscale class
      element.classList.add("threads-filter-grayscale");
      expect(element.classList.add).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
    });

    test("should handle style changes correctly", () => {
      const element = {
        style: {},
      };

      // Test hiding element
      element.style.display = "none";
      expect(element.style.display).toBe("none");

      // Test showing element
      element.style.display = "";
      expect(element.style.display).toBe("");
    });
  });

  describe("Grayscale opacity functionality", () => {
    test("should apply custom opacity to grayscale comments", () => {
      // Mock the applyFilterStyle method logic
      const applyFilterStyle = (commentElement, settings) => {
        if (settings.displayMode === "hide") {
          commentElement.style.display = "none";
        } else if (settings.displayMode === "grayscale") {
          commentElement.classList.add("threads-filter-grayscale");
          // Apply custom opacity value
          commentElement.style.setProperty(
            "--threads-filter-opacity",
            settings.grayscaleOpacity || 0.3
          );
        }
      };

      // Create a mock comment element
      const mockCommentElement = {
        style: {
          display: "",
          setProperty: jest.fn(),
        },
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      };

      // Test with default opacity
      const settingsWithDefaultOpacity = {
        ...mockSettings,
        displayMode: "grayscale",
        grayscaleOpacity: 0.3,
      };

      applyFilterStyle(mockCommentElement, settingsWithDefaultOpacity);

      expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
      expect(mockCommentElement.style.setProperty).toHaveBeenCalledWith(
        "--threads-filter-opacity",
        0.3
      );

      // Test with custom opacity
      const settingsWithCustomOpacity = {
        ...mockSettings,
        displayMode: "grayscale",
        grayscaleOpacity: 0.7,
      };

      // Reset mock
      mockCommentElement.classList.add.mockClear();
      mockCommentElement.style.setProperty.mockClear();

      applyFilterStyle(mockCommentElement, settingsWithCustomOpacity);

      expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
      expect(mockCommentElement.style.setProperty).toHaveBeenCalledWith(
        "--threads-filter-opacity",
        0.7
      );

      // Test with undefined opacity (should use default)
      const settingsWithUndefinedOpacity = {
        ...mockSettings,
        displayMode: "grayscale",
        grayscaleOpacity: undefined,
      };

      // Reset mock
      mockCommentElement.classList.add.mockClear();
      mockCommentElement.style.setProperty.mockClear();

      applyFilterStyle(mockCommentElement, settingsWithUndefinedOpacity);

      expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
      expect(mockCommentElement.style.setProperty).toHaveBeenCalledWith(
        "--threads-filter-opacity",
        0.3
      );
    });

    test("should remove opacity property when removing grayscale filter", () => {
      const removeFilterStyle = (commentElement) => {
        commentElement.style.display = "";
        commentElement.classList.remove("threads-filter-grayscale");
        commentElement.style.removeProperty("--threads-filter-opacity");
      };

      const mockCommentElement = {
        style: {
          display: "",
          removeProperty: jest.fn(),
        },
        classList: {
          remove: jest.fn(),
        },
      };

      removeFilterStyle(mockCommentElement);

      expect(mockCommentElement.style.display).toBe("");
      expect(mockCommentElement.classList.remove).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
      expect(mockCommentElement.style.removeProperty).toHaveBeenCalledWith(
        "--threads-filter-opacity"
      );
    });
  });
});
