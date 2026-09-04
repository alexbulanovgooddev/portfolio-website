import type { Plugin } from 'vue'
import { createVfm } from 'vue-final-modal'

export default defineNuxtPlugin(nuxtApp => {
	const vfm = createVfm() as Plugin

	nuxtApp.vueApp.use(vfm)
})
