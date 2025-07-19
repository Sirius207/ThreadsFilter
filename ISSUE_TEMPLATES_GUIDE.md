# GitHub Issue Templates Guide

This guide explains how to use the GitHub issue templates for the ThreadsFilter project and provides best practices for effective issue reporting.

## 📋 Available Templates

### 🐛 Bug Report (`bug_report.md`)

Use this template when you encounter a bug or unexpected behavior in ThreadsFilter.

**When to use:**

- Extension not working as expected
- Features not functioning properly
- UI/UX issues
- Extension crashes or errors

**Key sections to fill:**

- **Bug Description**: Clear explanation of what's wrong
- **Steps to Reproduce**: Detailed steps to recreate the issue
- **Environment Information**: Browser, OS, extension version
- **Extension Settings**: Your current configuration
- **Console Errors**: Any error messages from browser console

### ✨ Feature Request (`feature_request.md`)

Use this template to suggest new features or improvements.

**When to use:**

- New functionality ideas
- UI/UX improvements
- Performance enhancements
- Accessibility features

**Key sections to fill:**

- **Feature Description**: What you want to see
- **Problem Statement**: What problem this solves
- **Use Cases**: Specific scenarios where this would be useful
- **Impact Assessment**: How this benefits users

### 🌍 Translation Request (`translation_request.md`)

Use this template for language-related requests and issues.

**When to use:**

- Request support for new languages
- Report translation errors
- Suggest translation improvements
- Cultural adaptation requests

**Key sections to fill:**

- **Language Information**: Language name, code, and direction
- **Request Type**: New language, improvement, or bug
- **Specific Issues**: Detailed translation problems
- **Technical Considerations**: Any special requirements

### ⚡ Performance Issue (`performance_issue.md`)

Use this template when reporting performance problems.

**When to use:**

- Slow loading times
- High memory usage
- CPU spikes
- Lag or stuttering

**Key sections to fill:**

- **Performance Metrics**: Specific measurements
- **Environment Information**: Hardware and software details
- **Performance Comparison**: Before/after extension
- **Browser Developer Tools**: Console and performance data

### 🔒 Security Issue (`security_issue.md`)

Use this template for security-related concerns.

**When to use:**

- Data exposure vulnerabilities
- Permission abuse
- Privacy violations
- Security weaknesses

**Key sections to fill:**

- **Severity Level**: Critical, High, Medium, or Low
- **Vulnerability Type**: Specific security issue category
- **Impact Assessment**: Potential consequences
- **Technical Details**: How the vulnerability works

## 🎯 Best Practices for Issue Reporting

### Before Creating an Issue

1. **Search Existing Issues**: Check if your issue has already been reported
2. **Read Documentation**: Review README and other docs for solutions
3. **Test with Different Settings**: Try different extension configurations
4. **Clear Browser Cache**: Ensure it's not a caching issue
5. **Check Browser Console**: Look for error messages

### Writing Effective Issues

#### Be Specific and Detailed

- **Good**: "The extension doesn't filter comments on post pages"
- **Better**: "When I visit https://threads.net/@username/post/123, comments from accounts with less than 100 followers are not being filtered, even though I have 'Minimum Followers' set to 1000"

#### Provide Complete Information

- Browser version and OS
- Extension version
- Current settings
- Steps to reproduce
- Expected vs actual behavior

#### Include Visual Evidence

- Screenshots of the issue
- Console error messages
- Performance metrics
- Before/after comparisons

#### Use Clear Language

- Write in clear, concise sentences
- Use bullet points for lists
- Include relevant links
- Avoid jargon when possible

### Issue Template Guidelines

#### Required Fields

Always fill out all required sections in the template. If a section doesn't apply, write "N/A" or "Not applicable" rather than leaving it blank.

#### Optional Fields

Even if marked as optional, provide information when relevant:

- Screenshots often help explain issues
- Console errors provide debugging clues
- Environment details help reproduce problems

#### Code Blocks

When sharing code, console output, or configuration:

- Use proper code blocks with language syntax
- Format JSON/configuration properly
- Include relevant line numbers
- Remove sensitive information

## 🔧 Template Customization

### For Contributors

If you want to improve the templates:

1. **Edit Template Files**: Modify the `.md` files in `.github/ISSUE_TEMPLATE/`
2. **Update Config**: Modify `.github/ISSUE_TEMPLATE/config.yml` for form customization
3. **Test Changes**: Create test issues to verify template behavior
4. **Submit PR**: Use the pull request template for your changes

### Template Structure

Each template includes:

- **Front Matter**: YAML metadata for GitHub
- **Sections**: Organized content areas
- **Checklists**: Verification steps
- **Comments**: HTML comments for guidance

## 📊 Issue Management

### Labels

Templates automatically apply labels:

- `bug`, `enhancement`, `i18n`, `performance`, `security`
- `needs-triage` for initial review

### Workflow

1. **Issue Created**: Template applies labels and structure
2. **Triage**: Maintainers review and categorize
3. **Discussion**: Community provides feedback
4. **Resolution**: Issue is addressed or closed

### Response Times

- **Critical Security**: Within 24 hours
- **High Priority Bugs**: Within 48 hours
- **Feature Requests**: Within 1 week
- **General Issues**: Within 1-2 weeks

## 🚀 Getting Help

### Before Creating an Issue

- Check the [README](README.md) for basic information
- Review [existing issues](https://github.com/Sirius207/ThreadsFilter/issues)
- Search [discussions](https://github.com/Sirius207/ThreadsFilter/discussions)

### Alternative Support Channels

- **Discussions**: For questions and general help
- **Documentation**: For usage guides and tutorials
- **Wiki**: For detailed technical information

## 📝 Example Issues

### Good Bug Report Example

```
**Bug Description**: Extension doesn't filter comments when minimum followers is set to 1000

**Steps to Reproduce**:
1. Set minimum followers to 1000
2. Visit any Threads post with comments
3. Comments from accounts with <1000 followers remain visible

**Environment**: Chrome 120.0.6099.109, macOS 14.1, Extension v1.2.3

**Settings**: Enable Comment Filtering: Yes, Display Mode: Hide Comments, Min Followers: 1000

**Console Errors**: None found
```

### Good Feature Request Example

```
**Feature Description**: Add ability to filter by account age

**Problem Statement**: New accounts often post spam or low-quality comments

**Proposed Solution**: Add a "Minimum Account Age" filter option

**Use Cases**:
1. Filter out spam from newly created accounts
2. Focus on established community members
3. Reduce bot activity in comments
```

## 🔄 Template Updates

These templates are living documents that evolve with the project. Updates may include:

- New sections based on common issues
- Improved guidance and examples
- Additional language support
- Enhanced automation features

For suggestions on template improvements, please create an issue using the appropriate template or submit a pull request.
