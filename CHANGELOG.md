# Changelog

All notable changes to the Threads Comment Filter extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Blur Effect for Filtered Comments**
  - New blur slider in Advanced Settings (0px to 3px)
  - Apply blur filter to filtered comment text spans
  - Real-time blur effect updates when adjusting slider
  - Proper cleanup of blur effects when removing filters
  - Internationalization support for blur settings

### Fixed

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

### Changed

- **Performance Improvements**
  - Added debouncing for filter application to prevent conflicts with Threads DOM updates
  - Implemented smarter filter application logic with immediate execution for settings changes
  - Enhanced resource management with proper cleanup of debounce timers
  - Improved stability of hide animation mode

- **Code Architecture**
  - Separated debounced and immediate filter application logic
  - Added comprehensive style cleanup for all display modes
  - Enhanced error handling for content script communication
  - Improved memory management with proper timer cleanup

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
