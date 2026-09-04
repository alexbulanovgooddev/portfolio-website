<script setup lang="ts">
import type { Post } from '~~/shared/types'

interface Props {
	post: Post
}

const props = defineProps<Props>()
const linkTo = computed<string>(() => `/blog/${props.post.slug}/`)
</script>

<template>
	<div class="blog-card">
		<NuxtLink class="blog-card__link" :to="linkTo">
			<div class="blog-card__body">{{ post.title }}</div>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.blog-card {
	border: 4px solid var(--color-canvas);
	background-color: var(--color-chrome);
	box-shadow: 8px 8px 0 0 var(--color-canvas);

	&__link {
		display: flex;
		text-decoration: none;
		color: var(--color-ink);
		background-color: var(--color-chrome);

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
	}

	&__body {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		padding: 20px;

		@media screen and (min-width: $sm) {
			padding: 28px;
		}

		@media screen and (min-width: $md) {
			padding: 36px;
		}

		@media screen and (min-width: $lg) {
			padding: 32px;
		}
	}
}
</style>
