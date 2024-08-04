import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      less: {
        // 配置 less-loader 选项
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      // 将请求代理到目标服务器
      '/api': {
        target: 'http://localhost:3000', // 目标服务器地址
        changeOrigin: true, // 是否改变请求源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
})
