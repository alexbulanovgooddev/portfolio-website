<script setup lang="ts">
const { scrollLock, scrollUnLock } = useLock()

const isOpen = ref<boolean>(false)
const isDesktop = ref<boolean>(false)
const toggleIcon = computed<string>(() => (isOpen.value ? 'x' : 'burger'))
const toggleLabel = computed<string>(() =>
	isOpen.value ? 'Закрыть меню' : 'Открыть меню'
)

let mediaQuery: MediaQueryList | null = null

function handleMediaChange(): void {
	isDesktop.value = mediaQuery?.matches ?? false
}

function handleEscPress(event: KeyboardEvent): void {
	console.log('esc')
	if (event.key === 'Escape') isOpen.value = false
}

function handleClickOutside(event: MouseEvent): void {
	const target = event.target as HTMLElement

	const isOutside =
		!target.closest('[data-menu-toggle]') &&
		!target.closest('[data-menu-content]')
	const isLink = !!target.closest('a')
	const isCloseTarget = !!target.closest('[data-menu-close]')

	if (isOutside || isLink || isCloseTarget) isOpen.value = false
}

watch(isOpen, val => {
	if (val) {
		scrollLock()

		document.addEventListener('keydown', handleEscPress)
		document.addEventListener('click', handleClickOutside)
	} else {
		scrollUnLock()
		document.removeEventListener('keydown', handleEscPress)
		document.removeEventListener('click', handleClickOutside)
	}
})

onMounted(() => {
	mediaQuery = window.matchMedia('(min-width: 1024px)')
	handleMediaChange()
	mediaQuery.addEventListener('change', handleMediaChange)
})

onUnmounted(() => {
	scrollUnLock()
	document.removeEventListener('keydown', handleEscPress)
	document.removeEventListener('click', handleClickOutside)
	mediaQuery?.removeEventListener('change', handleMediaChange)
})
</script>

<template>
	<div class="header-menu" :class="{ 'is-active': isOpen }">
		<button
			id="header-menu-toggle"
			class="header-menu__toggle"
			variant="outline"
			:aria-expanded="isOpen"
			:aria-label="toggleLabel"
			aria-controls="header-menu-body"
			data-menu-toggle
			@click="isOpen = !isOpen"
		>
			<Icon
				class="header-menu__icon"
				:name="`icons:${toggleIcon}`"
				size="auto"
			/>
		</button>

		<div class="header-menu__container">
			<div class="header-menu__body">
				<AppHeaderNavigation />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.header-menu {
	@media screen and (min-width: $lg) {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		width: 100%;
	}

	&__toggle {
		@include cursor-pointer;

		border: 0;
		outline: none;
		display: flex;
		justify-self: center;
		align-items: center;
		height: 56px;
		padding: 0 20px;
		color: var(--color-ink);
		background-color: transparent;
		transition-property: color, background-color;
		transition-duration: 100ms;
		transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

		&:hover,
		&:focus-visible {
			color: var(--color-surface);
			background-color: var(--color-canvas);
		}

		html.dark & {
			&:hover,
			&:focus-visible {
				color: var(--color-ink);
				background-color: var(--color-canvas);
			}
		}

		@media screen and (min-width: $lg) {
			display: none;
		}
	}

	&__icon {
		width: 40px;
		height: 40px;
	}

	&__container {
		position: fixed;
		top: 68px;
		left: 100%;
		z-index: 40;
		width: 100%;
		height: calc(100svh - 68px);
		padding: 0 8px;
		visibility: hidden;
		overflow: hidden;
		background-color: #00000090;
		opacity: 0;
		transition:
			all 0s linear 400ms,
			opacity 100ms linear 100ms;

		@media screen and (min-width: $md) {
			top: 76px;
			padding: 0 16px;
		}

		@media screen and (min-width: $lg) {
			position: static;
			display: flex;
			height: 100%;
			padding: 0;
			visibility: visible;
			overflow: visible;
			transition: none;
			opacity: 1;
			background-color: transparent;
		}
	}

	&__body {
		position: relative;
		top: -100%;
		z-index: 40;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		transition: top 400ms linear 0s;
		overscroll-behavior: none;

		@media screen and (min-width: $lg) {
			position: static;
			transition: none;
			overflow: visible;
		}
	}

	&.is-active &__container {
		left: 0;
		opacity: 1;
		visibility: visible;
		transition:
			all 0s linear 0s,
			opacity 100ms linear 100ms;
	}

	&.is-active &__body {
		top: 0;
		transition: top 500ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
	}
}
</style>
