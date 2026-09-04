import { defineStore } from 'pinia'

interface State {
	_perPage: number | null
}

export const storeSetup = defineStore('setup', {
	state: (): State => ({
		_perPage: null
	}),

	getters: {
		perPage: state => state._perPage
	},

	actions: {
		async fetch() {
			const { setup } = await $fetch('/api/setup')

			this._perPage = setup.perPage
		}
	}
})
