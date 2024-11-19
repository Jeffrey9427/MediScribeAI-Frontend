import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//   }
// })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/transcribe': {
        target: 'https://mediscribeai-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
