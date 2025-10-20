# FrontendModule

# Project Rules Guide

This document summarizes the **rules and conventions** of the project to maintain consistency 


> **Note:** The folders `test-results` and `playwright-report` are in `.gitignore` and **should not be committed to Git**.

---

## 1. Naming Conventions

### Files and Folders
- Main folder: `src/` for source code.
- Test files: `<testID>.spec.ts`  
  Example: `TC1234.spec.ts`
- Configuration: `playwright.config.ts`
- Test reports and results: folders **to be ignored** (`playwright-report/`, `test-results/`).

### Variables and Functions (TypeScript / JavaScript)
- **Variables and functions:** `camelCase` → `userName`, `loginUser()`
- **Classes and components:** `PascalCase` → `LoginPage`, `UserManager`
- **Constants:** `UPPER_SNAKE_CASE` → `MAX_RETRIES`

## Branches

Include the **Test Case ID** in the branch name for traceability, followed by a short description:

```
TC1234-login
TC5678-existing-email
TC9101-maintenance
TC9999-critical-fix
```

## Commit Messages

**Commit types:**

- `feat:` → new feature or test case
- `fix:` → bug fix
- `chore:` → maintenance tasks, refactors, dependency updates
- `docs:` → documentation changes
- `refactor:` → code restructuring without changing functionality

Example:
```
feat: add login test for invalid credentials
fix: handle existing email registration error
chore: update dependencies for maintenance
docs: update README with new instructions
refactor: restructure test utilities without changing functionality
```
---

## Git Best Practices

- Always pull the latest changes before creating a branch:
  ```bash
  git pull --rebase
  ```
- Keep ignored files out of commits (`node_modules`, `playwright-report`, `test-results`).
- Write clear and concise commit messages in present tense.
- Each branch should relate to a single task or test case.

---

## Example Workflow

1. Pull latest changes:
    ```bash
    git pull --rebase
    ```
2. Create a feature branch for a test case:
    ```bash
    git checkout -b feature/TC1234-login
    ```
3. Work on your test and commit using Conventional Commits:
    ```bash
    git add .
    git commit -m "feat: add login test for invalid credentials"
    ```
4. Push your branch to remote:
    ```bash
    git push origin TC1234-login
    ```
5. Open a Pull Request and request review.

