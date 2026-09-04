<script setup lang="ts">
import type { HomeQuickData } from '~~/shared/types'

interface Props {
	content: HomeQuickData
}

defineProps<Props>()
</script>

<template>
	<div class="quick-links">
		<p class="quick-links__title visually-hidden">{{ content.title }}</p>

		<div class="quick-links__wrapper">
			<template v-for="link in content.links" :key="link.id">
				<NuxtLink v-if="link.to" class="quick-links__link" :to="link.to"
					>{{ link.label }}
					<Icon
						class="quick-links__icon"
						name="icons:arrow-top-right"
						size="auto"
					/>
				</NuxtLink>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.quick-links {
	&__title {
		margin: 0 0 10px;
	}

	&__wrapper {
		border: 4px solid var(--color-canvas);
		display: flex;
		flex-direction: column;
		background-color: var(--color-chrome);

		@media screen and (min-width: $md) {
			flex-direction: row;
		}
	}

	&__link {
		@include cursor-pointer;
		@include typo-paragraph-1;

		border-bottom: 4px solid var(--color-canvas);
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 12px;
		font-weight: 800;
		color: var(--color-ink);
		background-color: var(--color-chrome);
		text-decoration: none;

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
			border-bottom: 0;
			border-right: 4px solid var(--color-canvas);
			white-space: nowrap;
		}

		@media screen and (min-width: $lg) {
			padding: 20px;
			width: 25%;
		}
	}

	&__link:last-of-type {
		border-bottom: 0;

		@media screen and (min-width: $md) {
			border-right: 0;
		}
	}
}
</style>
