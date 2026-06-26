//  @ts-check
import { fileURLToPath } from 'node:url'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jestDomYa from 'eslint-plugin-jest-dom-ya'
import testingLibrary from 'eslint-plugin-testing-library'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
export default defineConfig([
  ...tanstackConfig,
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    ...testingLibrary.configs['flat/react'],
    ...jestDomYa.configs['flat/recommended'],
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    rules: {
      'jest-dom-ya/prefer-to-have-value': 'off',
    },
  },
  eslintConfigPrettier,
])
