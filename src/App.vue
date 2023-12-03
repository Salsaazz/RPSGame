<template>
  <UpdatePopup></UpdatePopup>

  <div id="app">
    <div class="p-3 bg-sky-400" v-if="shown">
    Add app to home screen?

    <button class="p-3 bg-sky-400" v-if="shown" @click="installPWA">
      Install!
    </button>

    <button class="p-3 bg-sky-400" wv-if="shown" @click="dismissPrompt">
      No, thanks
    </button>

  </div>
   <RPSGame />
  </div>
  
 </template>
 
 <script>
import RPSGame from './components/RPSGame.vue'
import UpdatePopup from './components/UpdatePopup.vue'
 
 export default {
  name: 'App',
  components: {
    UpdatePopup,
    RPSGame
}, 
    data: () => ({
    installEvent: undefined,
    shown: false,
  }),

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the banner once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },

    dismissPrompt() {
      this.shown = false
    }
  }
}
 </script>
 