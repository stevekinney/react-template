# Project-Name

## Prerequisites

- [Bun](https://bun.sh) installed on your machine.

## Installation

Create a new project based on this template:

```bash
# Basic installation
bun create github.com/stevekinney/bun-template $PROJECT_DIRECTORY

# Skip installing dependencies (useful for CI or offline work)
bun create github.com/stevekinney/bun-template $PROJECT_DIRECTORY --no-install
```

The `--no-install` flag is helpful when:

- Working in offline environments
- Using CI pipelines with cached dependencies
- You plan to modify dependencies before installation

## Core Tools

- **Bun**: Fast JavaScript runtime, bundler, test runner, and package manager
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **ESLint**: Static code analysis tool with strict preset
- **Prettier**: Opinionated code formatter
- **Husky**: Git hooks manager for consistent code quality
- **lint-staged**: Run linters on pre-committed files

### Quality Assurance

- **Bun Test Runner**: Built-in testing framework
- **GitHub Actions**: CI workflow for linting, testing, and building
- **commitlint**: Enforces conventional commit messages
- **Dependabot/Renovate**: Automates dependency updates

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
2. **commit-msg**: Enforces [Conventional Commits](https://www.conventionalcommits.org/) format for clear, standardized commit messages with helpful guidance.
3. **pre-push**: Runs before pushing to verify all code passes linting, type checking, and tests.

The Git hooks are powered by:

- **Husky**: For Git hook management
- **lint-staged**: For running linters and formatters only on changed files
- **commitlint**: For validating commit message format with a rich configuration

For more details on using and customizing these hooks, see [GIT_HOOKS.md](docs/GIT_HOOKS.md).

#### Interactive Commit Messages with Commitizen

This template includes [Commitizen](https://commitizen-tools.github.io/commitizen/) with `@commitlint/cz-commitlint` for guided commit message creation:

```bash
bun run commit
```

This command launches an interactive prompt that helps you create properly formatted conventional commits. The prompt will guide you through:

- Selecting the type of change (feat, fix, chore, etc.)
- Adding a scope (optional)
- Writing a clear, descriptive subject
- Adding a detailed body (optional)
- Noting any breaking changes

The interactive prompt ensures your commit messages are consistent with the project's commitlint configuration and follow conventional commit standards.

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

### Automated Dependency Updates

This template includes configurations for both Dependabot and Renovate - you can choose which one to use:

#### Dependabot

Dependabot is integrated directly with GitHub and configured in `.github/dependabot.yml`. It:

- Checks for dependency updates weekly
- Groups related dependencies together (TypeScript, ESLint, testing packages)
- Creates pull requests with detailed information about updates

To disable Dependabot if you prefer Renovate, simply delete the `.github/dependabot.yml` file.

#### Renovate

Renovate offers more customization options and is configured in `renovate.json`. It:

- Follows semantic versioning practices
- Automatically merges non-breaking changes
- Groups related dependencies
- Provides a dependency dashboard

To use Renovate, you'll need to:

1. Install the [Renovate GitHub App](https://github.com/apps/renovate) on your repository
2. Delete the `.github/dependabot.yml` file to avoid duplicate update PRs

For detailed information about dependency update options, see [DEPENDENCY_UPDATES.md](docs/DEPENDENCY_UPDATES.md)

### Understanding `bun run` vs `bunx`

`bun run` and `bunx` are two different commands that often confuse beginners:

- **bun run**: Executes scripts defined in your project's package.json (like `bun run dev` runs the "dev" script). Also runs local TypeScript/JavaScript files directly (like `bun run src/index.ts`).

- **bunx**: Executes binaries from npm packages without installing them globally (similar to npx). Use it for one-off commands or tools you don't need permanently installed (like `bunx prettier --write .` or `bunx shadcn@canary add button`).

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
Remember to update the copyright name in the license file before publishing.
