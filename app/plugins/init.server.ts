import type { Pinia } from 'pinia'
import { storeSetup } from '~/stores/storeSetup'
import { storeLayout } from '~/stores/storeLayout'

export default defineNuxtPlugin(async nuxtApp => {
	const pinia = nuxtApp.$pinia as Pinia
	const layout = storeLayout(pinia)
	const setup = storeSetup(pinia)

	await Promise.all([setup.fetch(), layout.fetch()])
})
