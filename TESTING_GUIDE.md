# Threads Comment Filter Extension - Testing Guide

This guide explains how to test and debug the Threads Comment Filter extension using the built-in test functions.

## Prerequisites

1. **Extension Installed**: Make sure the Threads Comment Filter extension is installed and enabled in your browser
2. **Threads.com Access**: Open [Threads.com](https://www.threads.com) in your browser
3. **Developer Tools**: Know how to open browser developer tools (F12 or right-click → Inspect)

## How to Run Tests

### Method 1: Using Browser Console (Recommended)

1. **Open Threads.com** in your browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. **Go to the Console tab**
4. **Run the test functions** by calling them directly in the console

### Method 2: Using Extension Debug Mode

Enable debug mode in the extension settings to see more detailed logging. The test functions will output their results to the console when debug mode is enabled.

## Available Test Functions

### 1. Avatar Detection Tests

#### `testAvatarDetection()`
Tests the avatar detection logic with known default and regular avatar URLs.

**What it tests:**
- Detection of default/anonymous profile pictures
- Recognition of regular user avatars
- URL pattern matching for Instagram's default avatar indicators

**Example output:**
```javascript
testAvatarDetection()
// Outputs detailed analysis of avatar URLs and detection results
```

### 2. Follower Count Functionality Tests

#### `testFollowerCountFeature()`
Tests the follower count parsing and formatting functions.

**What it tests:**
- Parsing follower counts from various formats (34, 1.2K, 500K, 1.5M, 2.3B)
- Formatting follower counts for display
- Edge cases and number conversions

**Example output:**
```javascript
testFollowerCountFeature()
// Tests parseFollowerCount and formatFollowerCount functions
// Shows expected vs actual results for each test case
```

#### `testFetchFollowerCount(username)`
Tests fetching follower count from a user's profile page.

**Parameters:**
- `username` (string): The username to fetch follower count for (without @ symbol)

**What it tests:**
- HTTP requests to user profile pages
- HTML parsing for follower count extraction
- Caching mechanism for follower counts

**Example usage:**
```javascript
testFetchFollowerCount("example_user")
// Attempts to fetch follower count for @example_user
```

### 3. Display and Visibility Tests

#### `testFollowerCountVisibility()`
Tests the visibility toggle for follower count displays.

**What it tests:**
- Current visibility state of follower count elements
- Toggle functionality between show/hide states
- CSS property changes for visibility control

**Example output:**
```javascript
testFollowerCountVisibility()
// Shows current state and tests toggle functionality
```

#### `testToggleFollowerCount()`
Manually toggles follower count display and re-processes comments.

**What it tests:**
- Manual toggle of the `showFollowerCount` setting
- Re-processing of all comments to update displays
- Persistence of visibility changes

**Example usage:**
```javascript
testToggleFollowerCount()
// Toggles follower count visibility and updates all comments
```

#### `testHideOnlyFollowers()`
Specifically tests hiding only the follower count text while preserving other elements.

**What it tests:**
- Selective hiding of follower count elements
- Preservation of time elements and other content
- CSS specificity and element targeting

**Example output:**
```javascript
testHideOnlyFollowers()
// Tests hiding followers while keeping time elements visible
```

### 4. Debug and Diagnostic Tests

#### `debugFollowerCountElements()`
Shows detailed information about follower count elements on the page.

**What it shows:**
- Count of follower count elements with specific class
- Current CSS properties (display, visibility, opacity)
- Time elements to verify they're not affected
- Current extension settings

**Example output:**
```javascript
debugFollowerCountElements()
// Provides comprehensive debug information about elements
```

## Complete Testing Workflow

Here's a recommended sequence for comprehensive testing:

```javascript
// 1. Test core functionality
testAvatarDetection()
testFollowerCountFeature()

// 2. Test with real data (replace with actual username)
testFetchFollowerCount("real_username")

// 3. Test display functionality
testFollowerCountVisibility()
testToggleFollowerCount()

// 4. Test specific scenarios
testHideOnlyFollowers()

// 5. Debug current state
debugFollowerCountElements()
```

## Understanding Test Output

### Avatar Detection Results
- **Expected Results**: Default avatars should return `true`, regular avatars should return `false`
- **Key Indicators**: Look for specific file IDs and cache keys that indicate default avatars

### Follower Count Results
- **Parsing Tests**: Should show ✅ for passed tests, ❌ for failed tests
- **Format Tests**: Verify numbers are formatted correctly (e.g., 1200 → "1.2K")

### Visibility Tests
- **Display Property**: Should show `"none"` when hidden, `""` or `"inline"` when visible
- **Element Count**: Verify the correct number of elements are being targeted

## Troubleshooting

### Common Issues

1. **Tests not found**: Make sure the extension is loaded and you're on Threads.com
2. **No output**: Check if debug mode is enabled in extension settings
3. **Errors**: Look for network errors or missing elements in the console

### Debug Mode

Enable debug mode in the extension popup to see detailed logging:
1. Click the extension icon
2. Enable "Debug Mode" in settings
3. Refresh the page
4. Run tests again

## Test Data

The tests use various sample data:
- **Avatar URLs**: Known default and regular avatar URLs from Instagram/Threads
- **Follower Counts**: Sample numbers in various formats (34, 1.2K, 500K, etc.)
- **Usernames**: Test usernames for profile fetching

## Contributing

When adding new features to the extension:
1. Add corresponding test functions
2. Document what each test validates
3. Include example usage and expected output
4. Update this guide with new test functions

## Notes

- These are not traditional unit tests but debugging and validation functions
- Tests are designed to run in the browser console on Threads.com
- Results are logged to the console for easy inspection
- Tests can be run multiple times to verify consistency
- Some tests may require network access for profile fetching