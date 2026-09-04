import type { ModalSlot } from 'vue-final-modal'
import type { Component } from 'vue'

import { useModal, useModalSlot, useVfm } from 'vue-final-modal'
import UIModal from '~/components/UIModal/UIModal.vue'

interface ModalConfig {
	component?: Component
	componentProps?: Record<string, unknown>
	headerProps?: Record<string, unknown>
	modalProps?: Record<string, unknown>
}

export function useUIModal() {
	const { closeAll } = useVfm()

	async function openModal(config?: ModalConfig) {
		const slots: { [key: string]: ModalSlot | undefined } = {}

		if (config?.component) {
			slots.default = useModalSlot({
				component: config.component,
				attrs: config.componentProps || {}
			})
		}

		const { open } = useModal({
			component: UIModal,
			attrs: {
				...(config?.modalProps ? { modalProps: config.modalProps } : {}),
				...(config?.headerProps ? { headerProps: config.headerProps } : {})
			},
			slots
		})

		open()
	}

	return {
		openModal,
		closeAll
	}
}
