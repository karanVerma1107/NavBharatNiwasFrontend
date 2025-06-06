import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    proxy:{
      '/api':{
        target: 'http://localhost:3008',
        changeOrigin: true,
        rewrite: (path)=>path.replace(/^\/api/,'/api')
      }
    }
  }
})
