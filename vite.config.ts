import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // リポジトリ名に合わせて /<リポジトリ名>/ を設定してください
  base: '/Lottery_app/',
  plugins: [react()],
  build: {
    outDir: 'dist' // デフォルトのままでも可。workflow の path と合わせること
  }
})
