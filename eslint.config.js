//  @ts-check
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
export default [
  ...tanstackConfig,
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  {
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    extends: [
      testingLibrary.configs['flat/react'],
      jestDom.configs['flat/recommended'],
    ],
  },
  eslintConfigPrettier,
]
