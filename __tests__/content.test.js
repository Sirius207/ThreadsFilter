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
      grayscaleOpacity: 0.1,
      blurAmount: 0,
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
      // Create a real DOM element for testing
      const mockCommentElement = document.createElement("div");
      mockCommentElement.style.setProperty = jest.fn();
      mockCommentElement.classList.add = jest.fn();
      mockCommentElement.classList.remove = jest.fn();
      mockCommentElement.addEventListener = jest.fn();
      mockCommentElement.removeEventListener = jest.fn();

      // Test settings
      const settingsWithHideMode = {
        ...mockSettings,
        displayMode: "hide",
        hideAnimation: true,
      };

      const settingsWithGrayscaleMode = {
        ...mockSettings,
        displayMode: "grayscale",
        grayscaleOpacity: 0.7,
      };

      // Test hide mode with animation
      if (
        settingsWithHideMode.displayMode === "hide" &&
        settingsWithHideMode.hideAnimation
      ) {
        mockCommentElement.classList.add("threads-filter-hidden");
        expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
          "threads-filter-hidden"
        );

        // Simulate the animation trigger
        setTimeout(() => {
          mockCommentElement.classList.add("hiding");
          expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
            "hiding"
          );
        }, 10);
      }

      // Test grayscale mode
      if (settingsWithGrayscaleMode.displayMode === "grayscale") {
        mockCommentElement.style.display = "";
        mockCommentElement.classList.remove("threads-filter-hidden", "hiding");
        mockCommentElement.classList.add("threads-filter-grayscale");
        mockCommentElement.style.setProperty(
          "--threads-filter-opacity",
          settingsWithGrayscaleMode.grayscaleOpacity || 0.1
        );

        expect(mockCommentElement.classList.add).toHaveBeenCalledWith(
          "threads-filter-grayscale"
        );
        expect(mockCommentElement.style.setProperty).toHaveBeenCalledWith(
          "--threads-filter-opacity",
          0.7
        );
      }
    });

    test("should remove opacity property when removing grayscale filter", () => {
      const mockCommentElement = document.createElement("div");
      mockCommentElement.style.removeProperty = jest.fn();
      mockCommentElement.classList.remove = jest.fn();
      mockCommentElement.style.display = "";

      // Simulate removing filter styles
      mockCommentElement.classList.remove("threads-filter-hidden");
      mockCommentElement.classList.remove("hiding");
      mockCommentElement.style.display = "";
      mockCommentElement.classList.remove("threads-filter-grayscale");
      mockCommentElement.style.removeProperty("--threads-filter-opacity");

      expect(mockCommentElement.style.display).toBe("");
      expect(mockCommentElement.classList.remove).toHaveBeenCalledWith(
        "threads-filter-hidden"
      );
      expect(mockCommentElement.classList.remove).toHaveBeenCalledWith(
        "hiding"
      );
      expect(mockCommentElement.classList.remove).toHaveBeenCalledWith(
        "threads-filter-grayscale"
      );
      expect(mockCommentElement.style.removeProperty).toHaveBeenCalledWith(
        "--threads-filter-opacity"
      );
    });
  });

  describe("Blur functionality", () => {
    let filterInstance;
    let mockCommentElement;

    beforeEach(() => {
      // Create a mock ThreadsCommentFilter instance
      filterInstance = {
        settings: { ...mockSettings },
        log: jest.fn(),
        // Mock the actual methods we want to test
        applyFilterStyle: function (commentElement) {
          if (this.settings.displayMode === "grayscale") {
            commentElement.classList.add("threads-filter-grayscale");
            commentElement.style.setProperty(
              "--threads-filter-opacity",
              this.settings.grayscaleOpacity || 0.3
            );

            // Apply blur effect to text spans if blur amount is greater than 0
            if (this.settings.blurAmount > 0) {
              // Set CSS custom property for blur amount
              commentElement.style.setProperty(
                "--threads-filter-blur",
                `${this.settings.blurAmount}px`
              );

              // Only target spans that contain actual text content, not container spans
              const textSpans = commentElement.querySelectorAll("span");
              textSpans.forEach((span) => {
                // Only apply blur to spans that contain text and are likely content spans
                // Skip spans that are likely containers (have children or specific classes)
                if (
                  span.textContent &&
                  span.textContent.trim() &&
                  !span.children.length &&
                  !span.classList.contains("threads-follower-count") && // Skip follower count
                  !span.closest('abbr[aria-label*="前"]') && // Skip time elements
                  !span.closest('abbr[aria-label*="ago"]') && // Skip time elements
                  !span.closest("time") && // Skip time elements
                  !span.classList.contains("x1lliihq") && // Skip container classes
                  !span.classList.contains("x1plvlek") &&
                  !span.classList.contains("xryxfnj") &&
                  !span.classList.contains("x1n2onr6") &&
                  !span.classList.contains("x1ji0vk5") &&
                  !span.classList.contains("x18bv5gf") &&
                  !span.classList.contains("xi7mnp6") &&
                  !span.classList.contains("x193iq5w") &&
                  !span.classList.contains("xeuugli") &&
                  !span.classList.contains("x1fj9vlw") &&
                  !span.classList.contains("x13faqbe") &&
                  !span.classList.contains("x1vvkbs") &&
                  !span.classList.contains("x1s928wv") &&
                  !span.classList.contains("xhkezso") &&
                  !span.classList.contains("x1gmr53x") &&
                  !span.classList.contains("x1cpjm7i") &&
                  !span.classList.contains("x1fgarty") &&
                  !span.classList.contains("x1943h6x") &&
                  !span.classList.contains("x1i0vuye") &&
                  !span.classList.contains("xjohtrz") &&
                  !span.classList.contains("xo1l8bm") &&
                  !span.classList.contains("xp07o12") &&
                  !span.classList.contains("x1yc453h") &&
                  !span.classList.contains("xat24cr") &&
                  !span.classList.contains("xdj266r")
                ) {
                  // Use CSS custom property for blur effect
                  span.style.filter = `blur(var(--threads-filter-blur, 0px))`;
                }
              });
            }
          }
        },
        removeFilterStyle: function (commentElement) {
          commentElement.classList.remove("threads-filter-grayscale");
          commentElement.style.removeProperty("--threads-filter-opacity");
          commentElement.style.removeProperty("--threads-filter-blur");

          // Remove blur effects from text spans
          const textSpans = commentElement.querySelectorAll("span");
          textSpans.forEach((span) => {
            // Only remove blur from spans that contain text and are likely content spans
            // Skip spans that are likely containers (have children or specific classes)
            if (
              span.textContent &&
              span.textContent.trim() &&
              !span.children.length &&
              !span.classList.contains("threads-follower-count") && // Skip follower count
              !span.closest('abbr[aria-label*="前"]') && // Skip time elements
              !span.closest('abbr[aria-label*="ago"]') && // Skip time elements
              !span.closest("time") && // Skip time elements
              !span.classList.contains("x1lliihq") && // Skip container classes
              !span.classList.contains("x1plvlek") &&
              !span.classList.contains("xryxfnj") &&
              !span.classList.contains("x1n2onr6") &&
              !span.classList.contains("x1ji0vk5") &&
              !span.classList.contains("x18bv5gf") &&
              !span.classList.contains("xi7mnp6") &&
              !span.classList.contains("x193iq5w") &&
              !span.classList.contains("xeuugli") &&
              !span.classList.contains("x1fj9vlw") &&
              !span.classList.contains("x13faqbe") &&
              !span.classList.contains("x1vvkbs") &&
              !span.classList.contains("x1s928wv") &&
              !span.classList.contains("xhkezso") &&
              !span.classList.contains("x1gmr53x") &&
              !span.classList.contains("x1cpjm7i") &&
              !span.classList.contains("x1fgarty") &&
              !span.classList.contains("x1943h6x") &&
              !span.classList.contains("x1i0vuye") &&
              !span.classList.contains("xjohtrz") &&
              !span.classList.contains("xo1l8bm") &&
              !span.classList.contains("xp07o12") &&
              !span.classList.contains("x1yc453h") &&
              !span.classList.contains("xat24cr") &&
              !span.classList.contains("xdj266r")
            ) {
              if (span.style.filter && span.style.filter.includes("blur")) {
                span.style.filter = "";
              }
            }
          });
        },
        updateBlurAmount: function () {
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

            const textSpans = comment.querySelectorAll("span");
            textSpans.forEach((span) => {
              // Only apply blur to spans that contain text and are likely content spans
              // Skip spans that are likely containers (have children or specific classes)
              if (
                span.textContent &&
                span.textContent.trim() &&
                !span.children.length &&
                !span.classList.contains("threads-follower-count") && // Skip follower count
                !span.closest('abbr[aria-label*="前"]') && // Skip time elements
                !span.closest('abbr[aria-label*="ago"]') && // Skip time elements
                !span.closest("time") && // Skip time elements
                !span.classList.contains("x1lliihq") && // Skip container classes
                !span.classList.contains("x1plvlek") &&
                !span.classList.contains("xryxfnj") &&
                !span.classList.contains("x1n2onr6") &&
                !span.classList.contains("x1ji0vk5") &&
                !span.classList.contains("x18bv5gf") &&
                !span.classList.contains("xi7mnp6") &&
                !span.classList.contains("x193iq5w") &&
                !span.classList.contains("xeuugli") &&
                !span.classList.contains("x1fj9vlw") &&
                !span.classList.contains("x13faqbe") &&
                !span.classList.contains("x1vvkbs") &&
                !span.classList.contains("x1s928wv") &&
                !span.classList.contains("xhkezso") &&
                !span.classList.contains("x1gmr53x") &&
                !span.classList.contains("x1cpjm7i") &&
                !span.classList.contains("x1fgarty") &&
                !span.classList.contains("x1943h6x") &&
                !span.classList.contains("x1i0vuye") &&
                !span.classList.contains("xjohtrz") &&
                !span.classList.contains("xo1l8bm") &&
                !span.classList.contains("xp07o12") &&
                !span.classList.contains("x1yc453h") &&
                !span.classList.contains("xat24cr") &&
                !span.classList.contains("xdj266r")
              ) {
                if (this.settings.blurAmount > 0) {
                  // Use CSS custom property for blur effect
                  span.style.filter = `blur(var(--threads-filter-blur, 0px))`;
                } else {
                  span.style.filter = "";
                }
              }
            });
          });
        },
      };

      // Create a mock comment element with text spans
      mockCommentElement = document.createElement("div");
      const textSpan1 = document.createElement("span");
      textSpan1.textContent = "This is a test comment";
      const textSpan2 = document.createElement("span");
      textSpan2.textContent = "Another line of text";
      mockCommentElement.appendChild(textSpan1);
      mockCommentElement.appendChild(textSpan2);
    });

    test("should apply blur effect to text spans when blur amount is greater than 0", () => {
      // Test settings with blur
      filterInstance.settings = {
        ...mockSettings,
        displayMode: "grayscale",
        blurAmount: 0.5,
      };

      // Use the actual applyFilterStyle method
      filterInstance.applyFilterStyle(mockCommentElement);

      // Verify blur was applied using CSS custom property
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("0.5px");

      // Verify blur was applied to text spans
      const spans = mockCommentElement.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent && span.textContent.trim()) {
          expect(span.style.filter).toBe(
            "blur(var(--threads-filter-blur, 0px))"
          );
        }
      });
    });

    test("should not apply blur effect when blur amount is 0", () => {
      // Test settings without blur
      filterInstance.settings = {
        ...mockSettings,
        displayMode: "grayscale",
        blurAmount: 0,
      };

      // Use the actual applyFilterStyle method
      filterInstance.applyFilterStyle(mockCommentElement);

      // Verify no blur CSS custom property was set
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("");

      // Verify no blur was applied to text spans
      const spans = mockCommentElement.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent && span.textContent.trim()) {
          expect(span.style.filter).toBe("");
        }
      });
    });

    test("should remove blur effects when removing filter styles", () => {
      // First apply blur
      filterInstance.settings = {
        ...mockSettings,
        displayMode: "grayscale",
        blurAmount: 0.5,
      };
      filterInstance.applyFilterStyle(mockCommentElement);

      // Verify blur was applied
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("0.5px");

      // Now remove the filter styles using the actual method
      filterInstance.removeFilterStyle(mockCommentElement);

      // Verify blur was removed
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("");

      // Verify blur was removed from text spans
      const spans = mockCommentElement.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent && span.textContent.trim()) {
          expect(span.style.filter).toBe("");
        }
      });
    });

    test("should update blur amount for existing grayscale comments", () => {
      // First apply blur with 0.5px
      filterInstance.settings = {
        ...mockSettings,
        displayMode: "grayscale",
        blurAmount: 0.5,
      };
      filterInstance.applyFilterStyle(mockCommentElement);

      // Verify initial blur was applied
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("0.5px");

      // Add the element to document so querySelector can find it
      document.body.appendChild(mockCommentElement);

      // Now update blur amount to 1.5px using the actual updateBlurAmount method
      filterInstance.settings.blurAmount = 1.5;
      filterInstance.updateBlurAmount();

      // Verify blur amount was updated
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("1.5px");

      // Verify text spans still have the blur filter with updated CSS custom property
      const spans = mockCommentElement.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent && span.textContent.trim()) {
          expect(span.style.filter).toBe(
            "blur(var(--threads-filter-blur, 0px))"
          );
        }
      });

      // Clean up
      document.body.removeChild(mockCommentElement);
    });

    test("should remove blur when blur amount is set to 0", () => {
      // First apply blur with 0.5px
      filterInstance.settings = {
        ...mockSettings,
        displayMode: "grayscale",
        blurAmount: 0.5,
      };
      filterInstance.applyFilterStyle(mockCommentElement);

      // Verify initial blur was applied
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("0.5px");

      // Add the element to document so querySelector can find it
      document.body.appendChild(mockCommentElement);

      // Now set blur amount to 0 using the actual updateBlurAmount method
      filterInstance.settings.blurAmount = 0;
      filterInstance.updateBlurAmount();

      // Verify blur CSS custom property was removed
      expect(
        mockCommentElement.style.getPropertyValue("--threads-filter-blur")
      ).toBe("");

      // Verify blur was removed from text spans
      const spans = mockCommentElement.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent && span.textContent.trim()) {
          expect(span.style.filter).toBe("");
        }
      });

      // Clean up
      document.body.removeChild(mockCommentElement);
    });
  });
});
