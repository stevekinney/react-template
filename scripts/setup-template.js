#!/usr/bin/env bun

/**
 * Cross-platform template setup script
 * Replaces placeholders in all project files with actual values
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import pkg from '../package.json' with { type: 'json' };

const directory = process.cwd();

/**
 * Gets the author name from git config or environment variables
 * @returns {string} The author name
 */
export function getAuthorName() {
  try {
    return execSync('git config --get user.name', { encoding: 'utf8' }).trim();
  } catch {
    return process.env.GIT_Steve Kinney || process.env.GIT_COMMITTER_NAME || 'Unknown Author';
  }
}

/**
 * Converts a string to capital case (first letter of each word capitalized)
 * @param {string} str - The string to convert
 * @returns {string} The string in capital case
 */
function capitalCase(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

const projectName = capitalCase(process.env.Project-Name || pkg.name || path.basename(directory));
const authorName = getAuthorName();
const currentYear = new Date().getFullYear().toString();

// Placeholders to replace
const replacements = [
  { placeholder: 'project-name', value: projectName.toLowerCase().replace(/\s+/g, '-') },
  { placeholder: 'Project-Name', value: projectName },
  { placeholder: '2025', value: currentYear },
  { placeholder: 'Steve Kinney', value: authorName },
  { placeholder: 'Steve Kinney', value: authorName },
];

pkg.name = projectName.toLowerCase().replace(/\s+/g, '-');

await Bun.write(path.join('.', 'package.json'), JSON.stringify(pkg, null, 2));

// Directories to ignore
const ignoreDirs = ['node_modules', '.git', 'dist', '.bun'];

// File extensions to process
const extensionsToProcess = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.html',
  '.css',
  '.toml',
  '.yaml',
  '.yml',
  '.sh',
  '.txt',
  '.gitignore',
  '.env',
];

/**
 * Processes a file by replacing specified placeholders with their corresponding values
 * if the file's extension or name matches the allowed list. Writes changes back to the file
 * if any replacements are made.
 *
 * @async
 * @function
 * @param {string} fullPath - The absolute path to the file to process.
 * @returns {Promise<void>} Resolves when processing is complete.
 */
async function processFile(fullPath) {
  const ext = path.extname(fullPath).toLowerCase();
  const fileName = path.basename(fullPath);
  const shouldProcess =
    extensionsToProcess.includes(ext) || extensionsToProcess.some((e) => fileName.endsWith(e));

  if (!shouldProcess) return;

  try {
    let content = await Bun.file(fullPath).text('utf8');
    let changed = false;

    for (const { placeholder, value } of replacements) {
      if (content.includes(placeholder)) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        content = content.replace(new RegExp(placeholder, 'g'), value);
        changed = true;
      }
    }

    if (changed) {
      await Bun.write(fullPath, content);
      // eslint-disable-next-line no-console
      console.log('✓', `Updated placeholders in ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${fullPath}:`, error.message);
  }
}

/**
 * Recursively processes all files in a directory, replacing placeholders
 * @async
 * @param {string} directory - The directory path to process
 * @returns {Promise<void>} Resolves when all files are processed
 * @throws {TypeError} When dirPath is not a string
 */
async function processFiles(directory) {
  if (typeof directory !== 'string') {
    throw new TypeError('Directory path must be a string');
  }
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const entries = await fs.readdir(String(directory), { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoreDirs.includes(entry.name)) {
        await processFiles(fullPath);
      }
      continue;
    }

    await processFile(fullPath);
  }
}

// Process all files in the project
try {
  // eslint-disable-next-line no-console
  console.log(`🚀 Setting up ${projectName}…`);
  await processFiles(directory);
  // eslint-disable-next-line no-console
  console.log(`✨ Setup complete for ${projectName}!`);
} catch (error) {
  console.error(`Error reading directory ${directory}:`, error.message);
}
