import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'lib/', // TypeScript build output
        'dist/' // Build artifacts
      ]
    }
  }
})
