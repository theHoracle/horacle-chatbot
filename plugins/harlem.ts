import { createVuePlugin } from "harlem"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createVuePlugin())
});