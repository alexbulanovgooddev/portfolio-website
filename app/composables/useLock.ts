export default function useLock() {
	const lockCount = useState<number>('scroll-lock-count', () => 0)
	const scrollOffset = useState<number>('scroll-lock-offset', () => 0)

	const isLocked = computed(() => lockCount.value > 0)

	if (typeof window === 'undefined') {
		return {
			isLocked,
			scrollLock: () => {},
			scrollUnLock: () => {}
		}
	}

	const documentElement = document.documentElement as HTMLElement
	const body = document.body

	const scrollLock = (): void => {
		lockCount.value++
		if (lockCount.value > 1) return

		scrollOffset.value = window.scrollY

		const lockPaddingOffset = window.innerWidth - documentElement.offsetWidth

		body.style.position = 'fixed'
		body.style.top = `-${scrollOffset.value}px`
		body.style.left = '0'
		body.style.right = '0'
		body.style.width = '100%'
		body.style.overflow = 'hidden'
		// body.style.paddingRight = `${lockPaddingOffset}px`

		documentElement.style.scrollBehavior = 'unset'

		const matches = document.querySelectorAll<HTMLElement>('.lock-padding')
		matches.forEach(elem => {
			elem.style.paddingRight = `${lockPaddingOffset}px`
		})
	}

	const scrollUnLock = (): void => {
		if (lockCount.value === 0) return
		lockCount.value--
		if (lockCount.value > 0) return

		body.style.position = ''
		body.style.top = ''
		body.style.left = ''
		body.style.right = ''
		body.style.width = ''
		body.style.overflow = ''
		body.style.paddingRight = ''

		documentElement.style.scrollBehavior = ''

		const matches = document.querySelectorAll<HTMLElement>('.lock-padding')
		matches.forEach(elem => {
			elem.style.paddingRight = ''
		})

		const offset = scrollOffset.value
		requestAnimationFrame(() => {
			window.scrollTo({ top: offset, behavior: 'instant' })
		})
	}

	return {
		isLocked,
		scrollLock,
		scrollUnLock
	}
}
