<template>
<div v-if="updateExists" id="snackbar" class="fixed bottom-0 right-0 m-6 p-4 bg-blue-500 text-white rounded-lg">
 An update is available
 <button class="ml-4 text-white bg-blue-700 rounded-lg p-2" @click="refreshApp">Update</button>
</div>
  </template>
  <script>
  
export default{
  name: 'UpdatePopup',
  data() {
    return {
      // refresh variables
      refreshing: false,
      registration: null,
      updateExists: false,
    }
  },

  created() {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
    })
  },

  methods: {
    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },

    // Called when the user accepts the update
    refreshApp() {
      this.updateExists = false
      window.location.reload()

    },
  }
}
  </script>