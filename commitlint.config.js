/**
 * Commitlint configuration
 *
 * This configuration enforces the Conventional Commits specification
 * to create a standardized commit history.
 *
 * Format: type(scope): subject
 * Example: feat(auth): add login functionality
 *
 * For more details: https://www.conventionalcommits.org
 */

// Define available commit types with descriptions for better guidance
const types = {
  build: 'Changes that affect the build system or external dependencies',
  chore: "Routine tasks, maintenance, or refactors that don't change production code",
  ci: 'Changes to CI configuration files and scripts',
  docs: 'Documentation only changes',
  feat: 'A new feature for the user or a significant change',
  fix: 'A bug fix',
  perf: 'A code change that improves performance',
  refactor: 'A code change that neither fixes a bug nor adds a feature',
  revert: 'Reverting a previous commit',
  style: "Changes that don't affect the meaning of the code (formatting, etc.)",
  test: 'Adding or correcting tests',
};

// Convert the types to the format needed for commitlint
const typeEnum = Object.keys(types);

export default {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',

  // Custom prompts for commitizen if used
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change you're committing:",
        enum: typeEnum,
        // For each type, provide a description in the hint
        hint: Object.entries(types)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },

  // Rules for commit message validation
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', typeEnum],
  },
};
