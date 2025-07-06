# Changelog

All notable changes to the Threads Comment Filter extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Click-to-show option for filtered comments
- Internationalization (i18n) support with language selector
- Japanese language support
- Extension icon in popup header with centered title
- Improved i18n architecture for better language support

### Changed

- Enhanced popup UI with better visual hierarchy
- Improved Japanese title font styling
- Better i18n fallback handling

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
