import type { FancyboxOptions } from '@fancyapps/ui'

import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

import useLock from '~/composables/useLock'

export default defineNuxtPlugin(() => {
	const { scrollLock, scrollUnLock } = useLock()

	const options: Partial<FancyboxOptions> = {
		Hash: false,
		hideScrollbar: false,
		Carousel: {
			infinite: false,
			Toolbar: {
				display: { left: [], middle: [], right: ['close'] }
			}
		},
		on: { init: scrollLock, destroy: scrollUnLock }
	}

	Fancybox.bind('[data-fancybox]', options)

	return {
		provide: {
			Fancybox,
			fancyboxOptions: options
		}
	}
})
