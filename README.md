# Project-Name

## Prerequisites

- [Bun](https://bun.sh) installed on your machine.

## Installation

Create a new project based on this template:

```bash
# Basic installation
bun create github.com/stevekinney/bun-template $PROJECT_DIRECTORY
```

## Development

Start the development server:

```bash
bun run dev
```

### Redis

This project uses [Bun's built-in Redis client](https://bun.sh/docs/api/redis). By default it will look for the `REDIS_URL` when establishing a connection.

### Data Persistence

You can either use Bun's built-in [PostgreSQL support](https://bun.sh/docs/api/sql) or [SQLite support](https://bun.sh/docs/api/sqlite).

### Git Hooks with Husky

This template uses [Husky](https://typicode.github.io/husky/) to manage Git hooks. When you run `npm install` or `bun install`, the prepare script automatically sets up Husky.

**IMPORTANT**: When Husky is installed, it overwrites any existing Git hooks in your local repository. If you have custom Git hooks, make sure to back them up before installing, as they will be replaced by Husky's hooks.

The Git initialization happens automatically when installing dependencies. If you're facing issues with hooks, you can run `npx husky install` manually to reinitialize them.

#### Code Quality Hooks

This template includes three Git hooks to ensure code quality:

1. **pre-commit**: Runs on each commit to format and lint staged changes and verify TypeScript. Also runs tests related to changed files.
2. **pre-push**: Runs before pushing to verify all code passes linting, type checking, and tests.

The Git hooks are powered by:

- **Husky**: For Git hook management
- **lint-staged**: For running linters and formatters only on changed files

For more details on using and customizing these hooks, see [GIT_HOOKS.md](docs/GIT_HOOKS.md).

### Running Tests

This template comes with Bun's built-in test runner. To run tests:

```bash
bun test
```

For watching mode:

```bash
bun test --watch
```

For test coverage:

```bash
bun test --coverage
```

### Continuous Integration

A GitHub Actions workflow is included in `.github/workflows/ci.yml` that runs on push to main and on pull requests. It performs:

- Linting
- Type checking
- Running tests
- Building the project

This ensures code quality and prevents regressions.

#### Dependabot

Dependabot is integrated directly with GitHub and configured in `.github/dependabot.yml`. It:

- Checks for dependency updates weekly
- Groups related dependencies together (TypeScript, ESLint, testing packages)
- Creates pull requests with detailed information about updates

To disable Dependabot if you prefer Renovate, simply delete the `.github/dependabot.yml` file.

### Understanding `bun run` vs `bunx`

`bun run` and `bunx` are two different commands that often confuse beginners:

- **bun run**: Executes scripts defined in your project's package.json (like `bun run dev` runs the "dev" script). Also runs local TypeScript/JavaScript files directly (like `bun run src/index.ts`).

- **bunx**: Executes binaries from npm packages without installing them globally (similar to `npx`). Use it for one-off commands or tools you don't need permanently installed (like `bunx prettier --write .` or `bunx shadcn@canary add button`).

## Project Structure

- `src/` - Source code for your application
- `.github/workflows/` - CI configuration
- `.husky/` - Git hooks for code quality

## Customization

### TypeScript Configuration

The template includes TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
