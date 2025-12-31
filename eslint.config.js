//  @ts-check
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
export default [
  ...tanstackConfig,
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  eslintConfigPrettier,
]
