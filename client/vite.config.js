import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    // ! Revisit | Uncomment when GraphQL is implemented
    // proxy: {
    //   "/graphql": {
    //     target: "http://localhost:3001",
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  }
})