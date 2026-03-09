import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    // Only apply base path for GitHub Pages in production builds
    base: mode === 'production' ? '/ACD-Engineering-Site/' : '/',
}))