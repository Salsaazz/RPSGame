const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'CoolGame',
    themeColor: '#34EBE1',
    msTileColor: '#4DBA87',
    display:'standalone',
    //apply updates of new service worker
    //and take control of all clients
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  }
})
