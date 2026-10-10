---
name: setup-commit-tools
description: >-
  Use this skill when setting up or configuring Commitizen, Husky, lint-staged, ESLint, and Prettier
  in a Node.js / Next.js project to enforce conventional commit messages and automated pre-commit code formatting.
---

# Setup Commit Tools (Commitizen, Husky & lint-staged)

This skill provides step-by-step instructions to install and configure standard commit tools in a Node.js/Next.js repository.

---

## 1. Install Required Dependencies

Install the dev dependencies:

```bash
npm install -D commitizen cz-conventional-changelog husky lint-staged prettier eslint-config-prettier
```

---

## 2. Configure `package.json`

Add or merge the following sections in `package.json`:

### Scripts

Ensure the `scripts` object contains:

```json
"scripts": {
  "prepare": "husky",
  "commit": "cz"
}
```

### Commitizen Configuration

Add the `config` field at the root level of `package.json`:

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

### lint-staged Configuration

Add the `lint-staged` rules at the root level of `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,css}": [
    "prettier --write"
  ]
}
```

---

## 3. Initialize Husky & Pre-commit Hook

1. Run the Husky initialization command:

   ```bash
   npx husky init
   ```

2. Create or update the pre-commit hook file `.husky/pre-commit` to execute `lint-staged`:
   ```bash
   npx lint-staged
   ```

---

## 4. Verification

1. Verify that `package.json` is valid JSON and contains `commitizen`, `husky`, and `lint-staged`.
2. Test running Commitizen:
   ```bash
   npm run commit
   ```
3. Stage a modified file and test `lint-staged`:
   ```bash
   npx lint-staged
   ```
