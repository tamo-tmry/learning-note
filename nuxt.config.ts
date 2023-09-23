// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            openaiApiKey: process.env.OPENAI_API_KEY,
            model: process.env.OPENAI_MODEL,
            systemMessage: process.env.SYSTEM_MESSAGE,
            endPointUrl: process.env.END_POINT_URL,
            apiKey: process.env.API_KEY,
        },
    },
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        // for HMR
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
})
