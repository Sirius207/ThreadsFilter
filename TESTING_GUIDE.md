# Testing Guide for Threads Comment Filter Extension

## Quick Start

### 1. Load the Extension

1. Install the extension in Chrome
2. Navigate to a Threads page (e.g., https://www.threads.com)
3. Wait for the page to fully load

### 2. Open Browser Console

- **Chrome**: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Option+K` (Mac)

### 3. Run Quick Tests

#### Check Extension Status (Recommended First Step)

```javascript
simpleTest();
```

This will check if you're on the right page and if the extension is loaded.

#### Check Extension Details

```javascript
checkExtension();
```

This will show you detailed information about what's available.

#### Run Full Tests (if extension is loaded)

```javascript
quickTest();
```

This will test all the internationalization and spacing functionality.

#### Test Internationalization Immediately

```javascript
testI18nNow();
```

This will test internationalization functionality even if the extension isn't fully loaded yet.

## Available Test Functions

### Basic Tests

```javascript
// Simple test - works immediately, doesn't require extension to be loaded
simpleTest();

// Check extension status - shows what's available
checkExtension();

// Test internationalization immediately - works without extension
testI18nNow();

// Quick test - checks if extension is working (requires extension to be loaded)
quickTest();

// Status check - shows available functions (requires extension to be loaded)
testExtensionStatus();
```

### Internationalization Tests

```javascript
// Test follower count translations
testInternationalization();

// Test spacing between numbers and text
testFollowerSpacing();
```

### Follower Count Tests

```javascript
// Test follower count functionality
testFollowerCountFeature();

// Test follower count visibility toggle
testFollowerCountVisibility();

// Test manual toggle
testToggleFollowerCount();

// Debug follower count elements
debugFollowerCountElements();

// Test hiding only followers
testHideOnlyFollowers();
```

### Avatar Tests

```javascript
// Test avatar detection
testAvatarDetection();
```

### Fetch Tests

```javascript
// Test fetching follower count for a specific user
testFetchFollowerCount("username");
```

## Expected Results

### Quick Test Results

```
=== Quick Test ===
✅ Extension loaded successfully
✅ Internationalization test: followers (or 位粉絲, フォロワー, etc.)
✅ Spacing test: " " (for English) or "" (for Chinese/Japanese)
✅ Complete display test: • 7.1K followers (or appropriate format)
=== End Quick Test ===
```

### Internationalization Test Results

```
=== Testing Internationalization ===
Language en: { expected: "followers", result: "followers", passed: "✅" }
Language zh_TW: { expected: "位粉絲", result: "位粉絲", passed: "✅" }
Language ja: { expected: "フォロワー", result: "フォロワー", passed: "✅" }
=== End Internationalization Test ===
```

### Spacing Test Results

```
=== Testing Follower Spacing ===
Language en: { expected: " ", result: " ", passed: "✅" }
Language zh_TW: { expected: "", result: "", passed: "✅" }
Language ja: { expected: "", result: "", passed: "✅" }
=== End Spacing Test ===
```

## Troubleshooting

### "testInternationalization is not defined" Error

**Problem**: The test function is not available.

**Solutions**:

1. **Use simple test first**: Run `simpleTest()` to check basic status
2. **Check extension details**: Run `checkExtension()` to see what's available
3. **Wait for extension to load**: The extension needs time to initialize
4. **Use quick test**: Run `quickTest()` to check if extension is ready
5. **Reload page**: If extension isn't loaded, try refreshing the page
6. **Check console**: Look for any error messages in the browser console

### Extension Not Loading

**Problem**: The extension doesn't seem to be working.

**Solutions**:

1. **Check extension is enabled**: Go to `chrome://extensions/` and ensure the extension is enabled
2. **Check permissions**: Make sure the extension has permission to access Threads
3. **Reload extension**: Click the reload button in `chrome://extensions/`
4. **Check for errors**: Look for error messages in the extension's console

### No Follower Counts Showing

**Problem**: Follower counts are not displayed.

**Solutions**:

1. **Check settings**: Make sure "Show Follower Counts" is enabled in the extension popup
2. **Wait for processing**: The extension needs time to process comments
3. **Refresh page**: Try refreshing the page to trigger reprocessing
4. **Check debug mode**: Enable debug mode in settings to see detailed logs

## Language Testing

### Test Different Languages

To test how the extension works with different languages:

1. **Change browser language**:
   - Go to Chrome Settings > Advanced > Languages
   - Add your desired language and move it to the top
   - Restart Chrome

2. **Test the extension**:
   ```javascript
   quickTest();
   testInternationalization();
   testFollowerSpacing();
   ```

### Expected Language Results

| Language | Follower Text | Spacing  | Example Display     |
| -------- | ------------- | -------- | ------------------- |
| English  | "followers"   | Space    | "• 7.1K followers"  |
| Chinese  | "位粉絲"      | No space | "• 7.1K位粉絲"      |
| Japanese | "フォロワー"  | No space | "• 7.1Kフォロワー"  |
| Korean   | "팔로워"      | No space | "• 7.1K팔로워"      |
| French   | "abonnés"     | Space    | "• 7,1K abonnés"    |
| German   | "Follower"    | Space    | "• 7,1K Follower"   |
| Spanish  | "seguidores"  | Space    | "• 7,1K seguidores" |

## Debug Mode

### Enable Debug Mode

1. Open the extension popup
2. Go to "Advanced Settings"
3. Enable "Debug Mode"
4. Check the browser console for detailed logs

### Debug Information

With debug mode enabled, you'll see:

- Comment processing logs
- Follower count extraction logs
- Filter application logs
- Internationalization logs

## Performance Testing

### Test Large Numbers of Comments

```javascript
// Check how many comments are processed
console.log(
  "Processed comments:",
  document.querySelectorAll(".threads-filter-processed").length
);

// Check filtered comments
console.log(
  "Filtered comments:",
  document.querySelectorAll(".threads-filter-grayscale, .threads-filter-hidden")
    .length
);
```

### Test Memory Usage

```javascript
// Check if follower cache is working
console.log(
  "Follower cache size:",
  window.threadsCommentFilter.followerCache.size
);
```

## Contributing

If you find issues or want to improve the testing:

1. **Report bugs**: Use the debug mode to get detailed error information
2. **Test edge cases**: Try different languages, comment types, and user scenarios
3. **Performance testing**: Test with large numbers of comments
4. **Accessibility testing**: Test with screen readers and keyboard navigation

## Support

If you need help:

1. Check this testing guide
2. Enable debug mode and check console logs
3. Try the troubleshooting steps above
4. Report issues with detailed error messages
