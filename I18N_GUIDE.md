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

- `getMessage(key, substitutions)`: Get translated text by key
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

- Automatic language detection based on browser settings
- Language preference persistence using Chrome storage
- Dynamic language switching with popup reload
- Fallback to English if translation is missing
- Support for placeholder substitutions

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
