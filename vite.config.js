const { defineConfig } = require('vite')
const react = require('@vitejs/react-plugin')

module.exports = defineConfig({
  plugins: [react()],
  base: './', 
})