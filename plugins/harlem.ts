import { createVuePlugin } from "harlem"
import devtoolsPlugin from '@harlem/plugin-devtools'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createVuePlugin({
        plugins: [
            devtoolsPlugin({
                label: 'Harlem State',
            })
        ]
    })
)
});