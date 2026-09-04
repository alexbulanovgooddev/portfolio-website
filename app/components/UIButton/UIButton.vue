<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
	label?: string | null
	icon?: string
	leadingIcon?: string
	trailingIcon?: string
	variant?: 'outline' | 'solid' | 'link'
	type?: 'button' | 'submit' | 'reset'
	to?: RouteLocationRaw
	href?: string | null
	disabled?: boolean
}

const {
	label = undefined,
	icon = undefined,
	leadingIcon = undefined,
	trailingIcon = undefined,
	variant = 'solid',
	type = 'button',
	to = undefined,
	href = undefined,
	disabled = false
} = defineProps<Props>()

const leadingIconName = computed(() => leadingIcon || icon)

const NuxtLink = resolveComponent('NuxtLink')

const tag = computed(() => {
	if (disabled) return 'button'
	if (to) return NuxtLink
	if (href) return 'a'
	return 'button'
})

const tagProps = computed(() => {
	if (disabled) return { type, disabled }
	if (to) return { to }
	if (href) return { href }
	return { type, disabled }
})
</script>

<template>
	<component
		:is="tag"
		class="ui-button"
		:class="[`ui-button--${variant}`]"
		v-bind="tagProps"
	>
		<template v-if="leadingIconName">
			<Icon class="ui-button__icon" :name="leadingIconName" />
		</template>
		<template v-if="label">
			<span class="ui-button__label">{{ label }}</span>
		</template>
		<template v-if="trailingIcon">
			<Icon class="ui-button__icon" :name="trailingIcon" />
		</template>
	</component>
</template>

<style lang="scss" scoped>
.ui-button {
	appearance: none;
	outline: none;
	border: 4px solid var(--color-canvas);
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 12px 18px;
	font-size: 18px;
	font-weight: 800;
	color: var(--color-ink);
	background-color: var(--color-chrome);
	text-decoration: none;
	text-align: center;
	cursor:
		url('~/assets/images/cursor-pointer@1x.png') 15 10,
		url('~/assets/images/cursor-pointer@2x.png') 15 10,
		auto;

	& > * + * {
		margin-left: 8px;
	}

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

	@media screen and (min-width: $md) {
		padding: 12px 20px;
	}

	@media screen and (min-width: $lg) {
		padding: 16px 24px;
	}

	&__icon {
		width: 28px;
		height: 28px;
	}

	&:disabled {
		opacity: 0.6;
		pointer-events: none;
		cursor:
			image-set(
				url('~/assets/images/cursor@1x.png') 1x,
				url('~/assets/images/cursor@2x.png') 2x
			),
			auto;
	}
}
</style>
