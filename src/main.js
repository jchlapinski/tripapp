import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { store } from '@/store';
import { router } from "@/router";

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(store)
    .use(router)
    .mount('#app')
