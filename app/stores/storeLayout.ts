import type { Nav } from '~~/shared/types'

import { defineStore } from 'pinia'

interface State {
	_copyright: string
	_navigation: Nav[]
}

export const storeLayout = defineStore('layout', {
	state: (): State => ({
		_copyright: '',
		_navigation: []
	}),

	getters: {
		copyright: state => state._copyright,
		navigation: state => state._navigation
	},

	actions: {
		async fetch() {
			const { layout } = await $fetch('/api/layout')

			this._navigation = layout.navigation
			this._copyright = layout.copyright ?? ''
		}
	}
})
