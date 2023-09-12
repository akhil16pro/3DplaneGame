import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    server: {
      port: 3000,
      hmr: true,
      host: 'localhost',
    },
    preview: {
      port: 8080,
      open: true,
    },
    base: './',
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    build: {
      outDir: './docs/',

      emptyOutDir: true,
    },
  }
})
