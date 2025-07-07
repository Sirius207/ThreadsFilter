# Internationalization (i18n) Guide

This document describes the internationalization implementation for the Threads Comment Filter extension, which supports English and Traditional Chinese.

## Overview

The extension uses Chrome's built-in i18n API to provide multi-language support. The implementation includes:

- Translation files in JSON format
- An i18n utility class for managing translations
- Language selector in the popup interface
- Proper font support for Chinese characters
- RTL (Right-to-Left) language support structure

## File Structure

```
src/
├── _locales/
│   ├── en/
│   │   └── messages.json          # English translations
│   └── zh_TW/
│       └── messages.json          # Traditional Chinese translations
├── i18n.js                        # i18n utility class
├── popup.html                     # Updated with data-i18n attributes
├── popup.js                       # Updated to use i18n
├── popup.css                      # Added language selector styles
└── manifest.json                  # Updated with i18n configuration
```

## Translation Files

### English (`src/_locales/en/messages.json`)

Contains all English text strings used in the extension. Each entry has:

- `message`: The actual translated text
- `description`: A description of where/how the text is used

### Traditional Chinese (`src/_locales/zh_TW/messages.json`)

Contains Traditional Chinese translations for all text strings. The translations are culturally appropriate and use proper Traditional Chinese characters.

## I18n Utility Class (`src/i18n.js`)

The `I18n` class provides:

### Key Methods

- `getMessage(key, substitutions)`: Get translated text by key using Chrome's i18n API
- `getLocale()`: Get current locale
- `getLanguageConfig()`: Get language configuration for current locale
- `usesScript(script)`: Check if current locale uses a specific script family
- `needsSpecialFonts()`: Check if current locale needs special font handling
- `getDirection()`: Get text direction (LTR/RTL)
- `getFontFamily()`: Get font family for current locale
- `getAvailableLanguages()`: Get all available languages
- `applyTranslations()`: Apply translations to DOM elements
- `init()`: Initialize i18n system
- `addLanguageSelector()`: Add language selector to popup
- `changeLanguage(locale)`: Change language and reload
- `loadLanguagePreference()`: Load saved language preference
- `detectBestLanguage(browserLang)`: Detect best language from browser settings

### Features

- **Hybrid Translation System**: Uses Chrome's i18n API as primary source with internal translations as fallback
- **Dynamic Language Switching**: Internal translations enable instant language changes without extension reload
- **Chrome i18n Integration**: Leverages Chrome's built-in i18n system for manifest and extension metadata
- **Automatic language detection** based on browser settings
- **Language preference persistence** using Chrome storage
- **Dynamic language switching** with popup reload
- **Robust fallback system** with multiple translation sources
- **Support for placeholder substitutions**

## Translation Architecture

### Hybrid System Design

The extension uses a hybrid translation system that combines Chrome's i18n API with internal translations:

#### Chrome i18n API (`src/_locales/[locale]/messages.json`)

- **Primary source** for translations
- Used for manifest metadata (`__MSG_appName__`, `__MSG_appDescription__`)
- Provides Chrome's built-in i18n functionality
- Requires extension reload to detect new languages

#### Internal Translations (`src/i18n.js`)

- **Fallback source** for dynamic language switching
- Enables instant language changes without extension reload
- Provides immediate feedback when users switch languages
- Maintains consistency with Chrome i18n translations

#### Translation Priority

1. **Internal translations** (for non-default locales during dynamic switching)
2. **Chrome i18n API** (primary source for all translations)
3. **Internal fallback** (current locale → default locale → key)

### Why This Hybrid Approach?

- **User Experience**: Users can switch languages instantly without reloading the extension
- **Development Efficiency**: Changes to translations in `messages.json` files are reflected after reload
- **Reliability**: Multiple fallback sources ensure translations always work
- **Chrome Integration**: Proper integration with Chrome's i18n system for manifest and metadata

## Implementation Details

### HTML Structure

Elements that need translation are marked with `data-i18n` attributes:

```html
<h1 data-i18n="popupTitle">Threads Comment Filter</h1>
<label data-i18n="minimumFollowers">Minimum Followers:</label>
<button data-i18n="refreshStats">Refresh Stats</button>
```

### JavaScript Integration

The popup controller initializes i18n before loading settings:

```javascript
async init() {
  // Initialize i18n first
  await window.i18n.loadLanguagePreference();
  window.i18n.init();

  // ... rest of initialization
}
```

### Dynamic Text Updates

For dynamic text that changes based on user actions:

```javascript
refreshBtn.textContent = window.i18n.getMessage("updating");
```

### CSS Styling

The CSS includes:

- Language selector styling
- Chinese font support with proper font stacks
- RTL language support structure
- Adjusted spacing for Chinese text

## Adding New Languages

The new flexible architecture makes it easy to add support for new languages. Here's how:

### 1. Add Language Configuration

In `src/i18n.js`, add a new entry to the `languageConfig` object:

```javascript
// In the languageConfig object
ja: {
  name: "Japanese",
  nativeName: "日本語",
  flag: "flag-jp",
  direction: "ltr",
  fontFamily: "Hiragino Sans, Yu Gothic, system-ui, sans-serif"
}
```

### 2. Add Translations

Create a new directory in `src/_locales/` with the locale code and add `messages.json`:

```json
// src/_locales/ja/messages.json
{
  "appName": {
    "message": "Threads コメントフィルター",
    "description": "Extension name"
  },
  "popupTitle": {
    "message": "Threads コメントフィルター",
    "description": "Popup title"
  },
  "filterSettings": {
    "message": "フィルター設定",
    "description": "Section header for filter settings"
  }
  // ... add all other translation keys
}
```

### 3. Update Manifest (Optional)

If using Chrome's i18n API, update `manifest.json`:

```json
{
  "default_locale": "en",
  "locales": {
    "en": "English",
    "zh_TW": "繁體中文",
    "ja": "日本語"
  }
}
```

### 4. Add Font Support (if needed)

For languages that need special fonts, add CSS rules in `popup.css`:

```css
/* Japanese font support */
[lang="ja"] {
  font-family: "Hiragino Sans", "Yu Gothic", system-ui, sans-serif;
}
```

### 5. Test the Implementation

The language selector will automatically include the new language, and the system will:

- Detect browser language preferences
- Apply appropriate fonts
- Handle text direction
- Provide fallbacks for missing translations

### Example: Adding Korean Support

```javascript
// 1. Add to languageConfig
ko: {
  name: "Korean",
  nativeName: "한국어",
  flag: "flag-kr",
  direction: "ltr",
  fontFamily: "Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif"
}

// 2. Add to scriptMap in usesScript method
cjk: ['zh_TW', 'zh_CN', 'ja', 'ko']

// 3. Create src/_locales/ko/messages.json with Korean translations
```

### Script Family Support

The system supports different script families:

- **Latin**: English, French, Spanish, German, etc.
- **CJK**: Chinese, Japanese, Korean
- **Arabic**: Arabic, Persian, Urdu
- **Cyrillic**: Russian, Ukrainian, Bulgarian

Each script family can have different font requirements and text handling.

## Testing

### Manual Testing

1. Load the extension in Chrome
2. Open the popup
3. Use the language selector to switch between English and Chinese
4. Verify all text is properly translated
5. Check that Chinese text displays with proper fonts

### Automated Testing

Use the test file `src/test-i18n.html` to verify translations:

1. Open the test file in a browser
2. Switch between languages using the dropdown
3. Verify all translations are correct
4. Check for any missing translations

## Best Practices

### Translation Keys

- Use descriptive, hierarchical keys (e.g., `filterSettings`, `enableCommentFiltering`)
- Keep keys consistent across languages
- Use camelCase for key names
- Include descriptions for context

### Text Content

- Keep translations concise but clear
- Consider cultural differences in terminology
- Test with native speakers when possible
- Maintain consistent terminology across the extension

### Technical Implementation

- Always provide fallbacks for missing translations
- Use Chrome's i18n API for consistency
- Store language preferences in Chrome storage
- Handle dynamic content updates properly

## Troubleshooting

### Common Issues

1. **Translations not showing**: Check that `data-i18n` attributes are properly set
2. **Missing translations**: Verify all keys exist in both language files
3. **Font issues**: Ensure proper font stacks are included in CSS
4. **Language not persisting**: Check Chrome storage permissions

### Debug Mode

Enable debug mode in the extension settings to see detailed logs about i18n operations.

## Future Enhancements

Potential improvements for the i18n system:

1. **More languages**: Add support for Spanish, French, German, etc.
2. **Context-aware translations**: Different translations based on context
3. **Pluralization support**: Handle plural forms properly
4. **Date/time formatting**: Localize date and time displays
5. **Number formatting**: Localize number displays (e.g., thousands separators)

## Resources

- [Chrome Extension i18n Documentation](https://developer.chrome.com/docs/extensions/mv3/i18n/)
- [Chrome i18n API Reference](https://developer.chrome.com/docs/extensions/reference/i18n/)
- [Unicode CLDR](http://cldr.unicode.org/) for locale data

## New Followers Internationalization

The extension now supports internationalization for follower counts. The system automatically detects the user's language and displays the appropriate translations.

### Follower Count Translations

The extension automatically displays follower counts in the user's language:

- **English**: "followers"
- **Traditional Chinese**: "位粉絲"
- **Japanese**: "フォロワー"
- **Korean**: "팔로워"
- **French**: "abonnés"
- **German**: "Follower"
- **Spanish**: "seguidores"
- **Russian**: "подписчиков"
- And many more...

### Usage in Content Script

The content script uses a `getMessage()` function that:

1. First tries to use Chrome's i18n API
2. Falls back to internal translations if Chrome i18n fails
3. Automatically detects the user's browser language
4. Provides comprehensive fallback translations for 100+ languages

```javascript
// Example usage in content script
const followerText = this.getMessage("followers");
// Returns "followers" for English, "位粉絲" for Chinese, etc.
```

### Testing Internationalization

You can test the internationalization functionality in the browser console:

```javascript
// Test follower count translations
testInternationalization();

// Test follower count display
testFollowerCountVisibility();
```

### Dynamic Language Detection

The extension automatically detects the user's language preference:

1. **Primary**: Chrome's UI language (`chrome.i18n.getUILanguage()`)
2. **Fallback**: Browser language (`navigator.language`)
3. **Default**: English

### Language Switching

Users can change the language through the popup interface:

1. Open the extension popup
2. Look for the language selector (if implemented)
3. Select your preferred language
4. The interface will update immediately

### Best Practices

#### 1. Use Translation Keys

Always use translation keys instead of hardcoded text:

```javascript
// ❌ Bad
element.textContent = "Hide Comments";

// ✅ Good
element.textContent = this.getMessage("hideComments");
```

#### 2. Provide Fallbacks

Always provide fallback translations for critical text:

```javascript
const message = this.getMessage("followers") || "followers";
```

#### 3. Test Multiple Languages

Test your translations in multiple languages to ensure they fit properly in the UI.

#### 4. Consider Text Length

Different languages have different text lengths. Ensure your UI can accommodate longer translations.

### Adding New Translation Keys

#### 1. Add to All Language Files

Add the new key to all `messages.json` files:

```json
{
  "newFeature": {
    "message": "New Feature",
    "description": "Description of the new feature"
  }
}
```

#### 2. Add to Internal Translations

Add to the `translations` object in `i18n.js`:

```javascript
en: {
  // ... existing translations
  newFeature: "New Feature",
},
zh_TW: {
  // ... existing translations
  newFeature: "新功能",
},
ja: {
  // ... existing translations
  newFeature: "新機能",
},
```

#### 3. Use in Code

Use the new key in your code:

```javascript
const text = this.getMessage("newFeature");
```

### Troubleshooting

#### Translation Not Showing

1. Check that the key exists in all language files
2. Verify the key is spelled correctly
3. Check browser console for errors
4. Ensure the language file is properly formatted JSON

#### Language Not Detected

1. Check browser language settings
2. Verify Chrome's UI language
3. Check for JavaScript errors in console

#### Fallback Not Working

1. Verify fallback translations exist in `i18n.js`
2. Check that the language code is correct
3. Ensure the fallback chain is working

### Contributing Translations

To contribute translations:

1. Fork the repository
2. Add your language files
3. Test thoroughly
4. Submit a pull request

Please ensure all translation keys are included and the JSON is properly formatted.
