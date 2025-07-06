# ThreadsFilter

A powerful browser extension that filters Threads comments based on follower count and avatar characteristics, providing a cleaner and more focused social media experience.

## Features

### 🔍 **Smart Comment Filtering**

- **Follower Count Filter**: Filter comments based on minimum and maximum follower counts
- **Avatar Detection**: Automatically hide comments from accounts with default avatars
- **Verified Account Filter**: Option to hide comments from verified accounts
- **Flexible Display Modes**: Choose between hiding comments completely or applying grayscale effect

### 📊 **Real-time Statistics**

- Track total comments processed
- Monitor filtered comment counts
- Separate statistics for follower-based and avatar-based filtering
- Live statistics updates with refresh capability

### ⚙️ **Customizable Settings**

- **Enable/Disable Filtering**: Toggle the entire filtering system on/off
- **Follower Count Display**: Show follower counts next to usernames
- **Display Mode Selection**:
  - Hide filtered comments completely
  - Apply grayscale effect to filtered comments
- **Follower Range Control**: Set minimum and maximum follower thresholds
- **Avatar Filter Options**: Control default avatar and verified account filtering

### 🛠️ **Developer Features**

- **Debug Mode**: Enable detailed console logging for troubleshooting
- **Settings Reset**: One-click reset to default configuration
- **Real-time Updates**: Filters apply immediately when settings change

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
3. Choose your preferred display mode (Hide or Grayscale)
4. Browse Threads - filtered comments will be automatically hidden or grayed out

## Configuration Options

### Filter Settings

- **Enable Comment Filtering**: Master toggle for all filtering features
- **Show Follower Counts**: Display follower counts next to usernames

### Display Mode

- **Hide Comments**: Completely remove filtered comments from view
- **Grayscale Comments**: Apply grayscale effect to filtered comments
  - **Customizable Opacity**: Adjust the opacity of grayscale comments (0.1 to 1.0) in Advanced Settings

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
- **Debug Mode**: Enable detailed console logging for troubleshooting

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
