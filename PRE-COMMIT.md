# Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality before commits.

## What happens on commit

When you commit code, the following checks run automatically:

1. **Pre-commit hook**: Runs lint-staged which:
   - Lints and auto-fixes JavaScript/TypeScript files with ESLint
   - Formats code with Prettier
   - Runs tests related to changed files

2. **Commit-msg hook**: Validates commit message format using conventional commits

3. **Pre-push hook**: Runs the full test suite before pushing

## Commit Message Format

Follow the conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Reverting previous commits

### Examples

```
feat: add grayscale opacity slider
fix: resolve follower count parsing issue
docs: update installation instructions
style: format code with prettier
```

## Bypassing hooks (if needed)

To bypass hooks in emergency situations:

```bash
git commit --no-verify -m "emergency fix"
git push --no-verify
```

⚠️ **Warning**: Only use this for true emergencies. The hooks are there to maintain code quality.

## Troubleshooting

If hooks fail:

1. Check the error messages
2. Fix the issues (linting errors, failing tests, etc.)
3. Stage the fixes: `git add .`
4. Try committing again

If you need to update the hooks:

```bash
npm run prepare
```
