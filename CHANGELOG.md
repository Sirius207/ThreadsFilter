# Changelog

All notable changes to the Threads Comment Filter extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-01-27

### Fixed

- **Username Extraction in Repost Scenarios**
  - Fixed issue where reposter username was incorrectly selected instead of actual author username
  - Modified `extractAuthorInfo` to check all username links in a comment and prioritize actual author
  - Added logic to detect and skip links containing "轉發" (repost) or "reposted" indicators
  - Enhanced username extraction to handle comments with multiple username links (e.g., reposter and actual author)
  - Added detailed logging for debugging username extraction process
  - Added `testUsernameExtraction()` method to verify the logic works correctly

- **Duplicate Fetch Requests for Same Username**
  - Fixed issue where multiple comments by the same user triggered multiple fetch requests
  - Added debounce mechanism to prevent simultaneous fetch requests for the same username
  - Implemented 100ms debounce delay to batch multiple rapid calls into single request
  - Added comprehensive request tracking with pending requests and failed requests sets
  - Enhanced logging to track debounce timer creation and cleanup

- **Click-to-Show Button Display Issues**
  - Fixed issue where Show buttons were not displaying in click-to-show mode
  - Simplified button addition logic by removing complex state management
  - Removed unnecessary `threadsShowButtonPending` and `threadsShowButtonAdded` state tracking
  - Ensured buttons are properly added when comments are filtered in click-to-show mode

- **Observer Re-triggering Prevention**
  - Identified root cause: DOM changes from button addition triggered Observer re-processing
  - Implemented dual solution: DOM-based prevention + debounce backup
  - Added comprehensive cleanup for debounce timers in all scenarios
  - Enhanced error handling for rate limiting and failed requests

### Added

- **Enhanced Debugging and Testing**
  - Added `testFollowerFetchDebounce()` function to verify debounce mechanism
  - Added `testClickToShowDOMImpact()` function to test DOM change impact
  - Added `testSolutionComparison()` function to compare solution approaches
  - Enhanced logging throughout fetch and filter processes
  - Added detailed tracking of pending requests and debounce timers

- **Robust Request Management**
  - Added `followerFetchDebounce` Map to track debounce timers per username
  - Implemented proper cleanup in `cleanup()` method for all debounce timers
  - Added cleanup in error handling and rate limiting scenarios
  - Enhanced `extractFollowerCount()` with pending request checks

### Changed

- **Code Architecture Improvements**
  - Simplified `applyFilterStyle()` method by removing complex button state management
  - Streamlined `updateClickMode()` method for better maintainability
  - Removed unnecessary pending button logic from `applyFiltersImmediate()`
  - Enhanced `fetchFollowerCountFromProfile()` with better error handling and cleanup

- **Performance Optimizations**
  - Reduced unnecessary DOM changes during initial comment processing
  - Improved request deduplication to prevent API rate limiting
  - Enhanced memory management with proper timer cleanup
  - Optimized Observer behavior to reduce unnecessary re-processing

### Technical Details

- **Debounce Implementation**: 100ms delay with proper timer management
- **Request Tracking**: Pending requests, failed requests, and cache management
- **DOM Change Prevention**: Avoid button addition during initial processing
- **Dual Protection**: DOM-based prevention + debounce mechanism as backup
- **Comprehensive Cleanup**: Timer cleanup in all scenarios including errors and rate limiting

## [1.1.0] - 2025-07-17

### Added

- **Blur Effect for Filtered Comments**
  - New blur slider in Advanced Settings (0px to 3px)
  - Apply blur filter to filtered comment text spans
  - Real-time blur effect updates when adjusting slider
  - Proper cleanup of blur effects when removing filters
  - Internationalization support for blur settings

- **Traditional Chinese Translation Improvements**
  - Changed "追蹤者" (followers) to "粉絲" (fans) in Traditional Chinese translations for better terminology consistency

### Fixed

- **Infinite Loop Prevention**
  - Fixed infinite loop issue in `cleanupHiddenStates`
  - Improved state change tracking mechanism to prevent unnecessary re-filtering
  - Optimized MutationObserver to distinguish between significant and minor DOM changes
  - Added debouncing for cleanup operations to prevent excessive calls

- **Comment Flickering Issues**
  - Fixed comment flickering when follower count updates
  - Added `_reapplyFiltersForComment` method to handle single comment filter updates
  - Modified MutationObserver to ignore our own follower count elements
  - Preserve avatar and verification status when updating follower count
  - Prevent unnecessary reprocessing that caused `cleanupHiddenStates` to reset filter styles

- **Layout and Visual Improvements**
  - Removed left border and padding from filtered comments
  - Optimized filtered label layout to prevent layout issues
  - Improved visual presentation of filtered comments

- **Duplicate Filtering Issues**
  - Fixed issue where some comments were filtered multiple times before stabilizing
  - Implemented batch update mechanism, changing immediate filtering after follower count retrieval to batch updates
  - Added protection mechanism in `applyFiltersImmediate` to prevent duplicate calls within 500ms
  - Optimized `processExistingComments` to use batch updates instead of immediate filtering
  - Added `scheduleBatchFilterUpdate` method to merge multiple filtering operations
  - Improved timeout management to ensure all debounce timers are properly cleaned up

- **Blur Effect Logic**
  - Blur now only resets to 0 on hover (when click-to-show is off) or on click (when click-to-show is on)
  - Prevented blur from resetting on hover when click-to-show is enabled
  - Refactored CSS to use custom property for blur, ensuring correct interaction with click/hover
  - Confirmed JS does not interfere with blur hover/click logic
  - Cleaned up duplicate and legacy CSS rules

- **Button Flickering Issue**
  - Fixed "Refresh Stats" button flickering caused by frequent updates
  - Added debouncing mechanism to prevent concurrent stats updates
  - Reduced automatic stats update frequency from 2 seconds to 5 seconds
  - Button now only shows "Updating..." state when manually clicked

- **Mode Switching Delays**
  - Fixed delay when switching from hide mode to grayscale mode
  - Implemented immediate filter application for settings changes
  - Created `applyFiltersImmediate()` method to bypass debouncing for settings updates
  - Improved style cleanup when switching between display modes

- **Hide Animation Mode Issues**
  - Fixed hidden comments flickering in and out when hideAnimation is enabled
  - Resolved conflicts between Threads DOM updates and filter application
  - Improved style management for hideAnimation mode
  - Added proper cleanup for all hide animation styles during mode transitions

- Prevent infinite loop in comment filtering: Fixed an issue where comments that should remain hidden (e.g., due to low follower count) would repeatedly toggle between hidden and visible states. Now, the cleanup logic only removes filter styles from comments that should be visible, preventing unnecessary DOM updates and UI flicker.
- Improved debug logging: Added detailed logs to track the filtering and cleanup process for each comment, including username, class state, and filtering reason. This makes it easier to debug and understand the comment filtering flow.

### Changed

- **Performance Improvements**
  - Optimized filter application to reduce duplicate logging
  - Added state change tracking to prevent unnecessary re-filtering
  - Improved MutationObserver to distinguish between significant and minor changes
  - Added debouncing for cleanup operations
  - Optimized `_reapplyFiltersForComment` to only log actual state changes
  - Reduced duplicate 'Comment filtered due to min followers' log messages

- **Code Architecture**
  - Extracted blur target span logic into helper method
  - Separated debounced and immediate filter application logic
  - Added comprehensive style cleanup for all display modes
  - Enhanced error handling for content script communication
  - Improved memory management with proper timer cleanup

- **UI/UX Enhancements**
  - Improved visual presentation of filtered comments
  - Optimized layout to prevent visual issues
  - Enhanced overall user experience

### Technical Details

- Added `applyFiltersImmediate()` method for instant filter application
- Implemented 1-second debouncing for filter application to prevent DOM conflicts
- Enhanced `applyFilterStyle()` method with complete style cleanup
- Added proper cleanup methods for both popup and content script timers
- Improved handling of Threads' frequent GraphQL requests and DOM updates

## [1.0.2] - 2025-07-07

### Added

- **Hide Mode Feature**
  - New hide mode as alternative to grayscale mode
  - Smooth fade-out animation for hidden comments
  - Hide animation toggle setting (animated vs instant hide)
  - Default instant hide behavior (no animation)

- **Enhanced Mode Switching**
  - Improved logic for switching between hide and grayscale modes
  - Automatic cleanup of hidden states when switching modes
  - Reset hidden states on page refresh to prevent persistence

- **Internationalization Improvements**
  - Added missing i18n keys for hide animation settings
  - Complete translations for hideAnimation in English, Traditional Chinese, and Japanese
  - Enhanced internal translation fallback system

- Click-to-show option for filtered comments
- Internationalization (i18n) support with language selector
- Japanese language support
- Extension icon in popup header with centered title
- Improved i18n architecture for better language support

### Changed

- Enhanced popup UI with better visual hierarchy
- Improved Japanese title font styling
- Better i18n fallback handling
- Updated test suite to cover new hide mode functionality
- Fixed test expectations to match default grayscaleOpacity value (0.1)

### Fixed

- Hidden comments no longer persist when switching from hide to grayscale mode
- Proper cleanup of hidden states on page refresh
- Missing translation keys for hide animation settings

## [1.0.1] - 2025-07-05

### Added

- Customizable grayscale opacity slider (0.1 to 1.0)
- Enhanced comment filtering with adjustable opacity settings
- Advanced settings section for fine-tuning filter behavior

### Changed

- Updated extension icons for better visual consistency
- Improved settings organization and user experience
- Enhanced grayscale filtering with opacity control

### Fixed

- Improved comment filtering performance and reliability

## [1.0.0] - 2025-0704

### Added

- **Core Filtering Features**
  - Follower count-based comment filtering
  - Avatar characteristic detection and filtering
  - Default avatar detection and filtering
  - Verified account filtering
  - Flexible display modes (hide/grayscale)

- **User Interface**
  - Popup-based settings management
  - Real-time filter statistics
  - Enable/disable filtering toggle
  - Follower count display option
  - Settings reset functionality

- **Advanced Features**
  - Debug mode for troubleshooting
  - Real-time comment processing
  - Mutation observer for dynamic content
  - Cached follower count data

- **Developer Experience**
  - Comprehensive test suite
  - ESLint and Prettier configuration
  - Pre-commit hooks with Husky
  - Commit message validation with commitlint
  - CI/CD pipeline setup
  - TypeScript support

### Technical Features

- Manifest V3 compatibility
- Chrome/Chromium browser support
- Firefox compatibility (temporary add-on)
- Local data processing (no external API calls)
- Minimal permission requirements
- Optimized performance with debounced updates

### Documentation

- Complete README with installation and usage instructions
- Testing guide for developers
- Pre-commit workflow documentation
- Internationalization guide

---

## Version History

### Version 1.0.0

- Initial release with core filtering functionality
- Complete browser extension with popup interface
- Comprehensive documentation and developer tools

### Version 1.0.1

- Enhanced filtering options with opacity control
- Improved user experience with click-to-show feature
- Better visual consistency with updated icons

### Upcoming Features

- Multi-language support (in development)
- Enhanced UI/UX improvements
- Additional filtering criteria
- Performance optimizations

---

## Contributing

When contributing to this project, please follow the conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or updating tests
- `ci:` for CI/CD changes
- `build:` for build system changes

## License

[Add your license information here]
