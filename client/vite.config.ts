import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ],
  },
  server: {
    proxy: {
      '^/api-faceden' : {
        target: 'https://mvu.pl/',
        changeOrigin: true
      }
    },
  }
})
