import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'lib/',
        '**/*.test.ts',
        '**/*.config.*'
      ]
    },
    clearMocks: true,
    restoreMocks: true
  }
})
