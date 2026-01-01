/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { nitro } from 'nitro/vite'
import { configDefaults } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    tailwindcss(),
    viteReact(),
  ],
  test: {
    environment: 'jsdom',
    passWithNoTests: true,
    exclude: [
      ...configDefaults.exclude,
      '**/dist/**',
      '**/cypress/**',
      '**/.{nx,svelte-kit,idea,git,cache,output,temp}/**',
      '**/{build,coverage,snap}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      '**/tests/e2e/**',
    ],
    include: ['./src/**/*.test.?(c|m)[jt]s?(x)'],
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default config
