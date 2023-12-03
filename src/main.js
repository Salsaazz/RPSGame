import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import './registerServiceWorker'
/*import RPSGame from './components/RPSGame.vue'
import UpdatePopup from './components/UpdatePopup.vue'*/

const app = createApp(App);
/*app.component("RPSGame", RPSGame);
app.component("UpdatePopup", UpdatePopup);*/
app.mount('#app');


