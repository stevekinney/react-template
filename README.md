# Full Stack React Boilerplate

## Prerequisites

- [Bun](https://bun.sh) installed on your machine.

## Installation

Create a new project based on this template:

```bash
# Basic installation
bun create github.com/stevekinney/react-template $PROJECT_DIRECTORY
```

### Setting Up Supabase

Once you have the basic setup in place, you'll want to set up a local environment for [Supabase](https://supabase.com).

```sh
bun run supabase:setup
```

This will provide you with some environment variables that we can use. Place these in `.env`.

```sh
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1N…
```

## Development

Start the development server:

```bash
bun run dev
```

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

## Known Issues

The UI tries to set the cookie when the authentication is complete. This works fine in Chrome, but doesn't work in Safari currently.
