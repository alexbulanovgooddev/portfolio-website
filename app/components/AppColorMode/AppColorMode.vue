<script setup lang="ts">
const colorMode = useColorMode()

const toggleIcon = computed<string>(() =>
	colorMode.value === 'light' ? 'mode-dark' : 'mode-light'
)
const toggleLabel = computed<string>(() =>
	colorMode.value === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'
)

function handleToggle(): void {
	colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
	<div class="color-mode">
		<ClientOnly>
			<button
				class="color-mode__toggle"
				:aria-label="toggleLabel"
				@click="handleToggle"
			>
				<Icon
					class="color-mode__icon"
					:name="`icons:${toggleIcon}`"
					size="auto"
				/>
			</button>
		</ClientOnly>
	</div>
</template>

<style lang="scss" scoped>
.color-mode {
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

		@media screen and (min-width: $lg) {
			height: 68px;
		}

		@media (hover: hover) {
			&:hover,
			&:focus-visible {
				color: var(--color-surface);
				background-color: var(--color-canvas);
			}
		}

		html.dark & {
			&:hover,
			&:focus-visible {
				color: var(--color-ink);
				background-color: var(--color-canvas);
			}
		}
	}

	&__icon {
		width: 40px;
		height: 40px;
	}
}
</style>
