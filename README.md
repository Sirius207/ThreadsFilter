# ThreadsFilter

A powerful browser extension that filters Threads comments based on follower count and avatar characteristics, providing a cleaner and more focused social media experience.

## Features

### 🔍 **Smart Comment Filtering**

- **Follower Count Filter**: Filter comments based on minimum and maximum follower counts
- **Avatar Detection**: Automatically hide comments from accounts with default avatars
- **Verified Account Filter**: Option to hide comments from verified accounts
- **Flexible Display Modes**: Choose between hiding comments completely or applying grayscale effect
- **Hide Mode with Animation**: Smooth fade-out animation for hidden comments with toggle option

### 🌍 **Internationalization**

- **Multi-language Support**: English, Traditional Chinese (繁體中文), and Japanese (日本語)
- **Language Selector**: Easy language switching with globe icon in popup header
- **Automatic Language Detection**: Detects browser language and applies appropriate translations
- **Complete UI Translation**: All interface elements are fully translated

### 📊 **Real-time Statistics**

- Track total comments processed
- Monitor filtered comment counts
- Separate statistics for follower-based and avatar-based filtering
- Live statistics updates with refresh capability

### ⚙️ **Customizable Settings**

- **Enable/Disable Filtering**: Toggle the entire filtering system on/off
- **Follower Count Display**: Show follower counts next to usernames
- **Display Mode Selection**:
  - **Hide Comments**: Completely hide filtered comments with optional smooth animation
  - **Grayscale Comments**: Apply grayscale effect to filtered comments
- **Follower Range Control**: Set minimum and maximum follower thresholds
- **Avatar Filter Options**: Control default avatar and verified account filtering
- **Click-to-Show**: Optional click interaction for filtered comments in grayscale mode

### 🛠️ **Developer Features**

- **Debug Mode**: Enable detailed console logging for troubleshooting
- **Settings Reset**: One-click reset to default configuration
- **Real-time Updates**: Filters apply immediately when settings change
- **Comprehensive Testing**: Full test suite with Jest and pre-commit hooks

## Installation

### Chrome/Chromium-based Browsers

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `src` folder
5. The extension icon should appear in your browser toolbar

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" tab
4. Click "Load Temporary Add-on" and select the `manifest.json` file

## Usage

1. **Navigate to Threads**: Visit [threads.com](https://www.threads.com)
2. **Open Extension**: Click the ThreadsFilter icon in your browser toolbar
3. **Configure Settings**: Adjust filtering preferences in the popup
4. **Apply Filters**: Comments will be filtered automatically based on your settings

### Quick Start

1. Enable "Enable Comment Filtering" in the extension popup
2. Set your desired minimum follower count (e.g., 100)
3. Choose your preferred display mode:
   - **Hide Comments**: For complete removal with optional smooth animation
   - **Grayscale Comments**: For visual filtering with customizable opacity
4. (Optional) Switch language using the globe icon in the popup header
5. Browse Threads - filtered comments will be automatically processed based on your settings

## Configuration Options

### Filter Settings

- **Enable Comment Filtering**: Master toggle for all filtering features
- **Show Follower Counts**: Display follower counts next to usernames

### Display Mode

- **Hide Comments**: Completely hide filtered comments from view
  - **Hide Animation**: Toggle between smooth fade-out animation or instant disappearance
  - **Default**: Instant hide (no animation) for better performance
- **Grayscale Comments**: Apply grayscale effect to filtered comments
  - **Customizable Opacity**: Adjust the opacity of grayscale comments (0.1 to 1.0) in Advanced Settings
  - **Click-to-Show**: Optional click interaction to temporarily show filtered comments

### Follower Count Filter

- **Minimum Followers**: Hide comments from accounts with fewer followers
- **Maximum Followers**: Hide comments from accounts with more followers
- Leave empty for no limit

### Avatar Filters

- **Hide Verified Accounts**: Filter out comments from verified accounts
- **Hide Default Avatars**: Filter out comments from accounts using default avatars

### Advanced Settings

- **Maximum Followers**: Set upper limit for follower count filtering
- **Grayscale Opacity**: Adjust the opacity level of filtered comments in grayscale mode (0.1 to 1.0)
- **Click to Show Filtered Comments**: Enable click interaction for grayscale comments
- **Hide Animation**: Toggle smooth fade-out animation for hidden comments
- **Debug Mode**: Enable detailed console logging for troubleshooting

## Recent Improvements (v1.0.2)

### 🎭 **Enhanced Hide Mode**

- **Smooth Animations**: Optional fade-out animation when hiding comments
- **Performance Optimized**: Default instant hide for better performance
- **Mode Switching**: Seamless transition between hide and grayscale modes
- **State Management**: Automatic cleanup of hidden states on page refresh

### 🌐 **Internationalization**

- **Language Support**: Full UI translation in English, Traditional Chinese, and Japanese
- **Smart Detection**: Automatic language detection based on browser settings
- **Easy Switching**: Globe icon in popup header for quick language changes
- **Complete Coverage**: All settings, labels, and descriptions are translated

### 🔧 **Technical Improvements**

- **Enhanced Mode Switching**: Improved logic for switching between display modes
- **State Cleanup**: Proper cleanup of hidden states to prevent persistence issues
- **Test Coverage**: Comprehensive test suite covering all new functionality
- **Performance**: Optimized animations and state management

## Technical Details

### Architecture

- **Content Script**: Processes and filters comments in real-time
- **Background Script**: Manages extension lifecycle and communication
- **Popup Interface**: User-friendly settings management
- **Mutation Observer**: Detects new comments dynamically

### Performance

- Efficient comment processing with debounced updates
- Cached follower count data to reduce API calls
- Optimized DOM manipulation for smooth user experience

### Browser Compatibility

- Chrome/Chromium-based browsers (Manifest V3)
- Firefox (with temporary add-on loading)
- Requires permissions for storage, active tab, and scripting

## Privacy & Security

- **Local Processing**: All filtering happens locally in your browser
- **No Data Collection**: The extension doesn't collect or transmit any user data
- **Minimal Permissions**: Only requests necessary permissions for functionality
- **Open Source**: Transparent codebase for security review

## Troubleshooting

### Common Issues

1. **Filters not working**: Ensure "Enable Comment Filtering" is turned on
2. **Statistics not updating**: Click "Refresh Stats" in the popup
3. **Settings not saving**: Check browser storage permissions

### Debug Mode

Enable debug mode in the extension popup to see detailed console logs for troubleshooting.

### Reset Settings

Use the "Reset to Defaults" button to restore all settings to their original values.

## Contributing

This is an open-source project. Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. The project uses pre-commit hooks to ensure code quality:
   - **Pre-commit**: Runs linting, formatting, and related tests
   - **Commit-msg**: Validates commit message format
   - **Pre-push**: Runs full test suite

   See [PRE-COMMIT.md](./PRE-COMMIT.md) for detailed information.

### Available Scripts

- `npm run build` - Build for production
- `npm run dev` - Development build with watch mode
- `npm run test` - Run tests
- `npm run lint` - Lint source code
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run package` - Build and package extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This extension is not affiliated with Meta or Threads. Use at your own discretion and in accordance with Threads' terms of service.
