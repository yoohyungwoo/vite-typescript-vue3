// src/main.ts
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import {setupLayouts} from "virtual:generated-layouts"
import generatedRoutes from "~pages"
const routes = setupLayouts(generatedRoutes)


// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    { routes },
    // function to have custom setups
    ({ app, router, routes, isClient, initialState }) => {
        // install plugins etc.
    },
)