//  @ts-check
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
export default [
  ...tanstackConfig,
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  {
    ...testingLibrary.configs['flat/react'],
    ...jestDom.configs['flat/recommended'],
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    rules: {
      'jest-dom/prefer-to-have-value': 'off',
    },
  },
  eslintConfigPrettier,
]
