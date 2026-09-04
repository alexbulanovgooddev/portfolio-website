<script setup lang="ts">
interface Props {
	pattern?: boolean
	small?: boolean
}

defineProps<Props>()
</script>

<template>
	<section class="section" :class="{ pattern: pattern, small: small }">
		<slot />
	</section>
</template>

<style lang="scss" scoped>
.section {
	border-bottom: 4px solid var(--color-canvas);
	padding: 60px 0;
	background-color: var(--color-surface);

	@media screen and (min-width: $md) {
		padding: 80px 0;
	}

	@media screen and (min-width: $lg) {
		padding: 120px 0;
	}

	&.pattern {
		@include pattern;
	}

	&.small {
		@media screen and (min-width: $md) {
			padding: 60px 0;
		}

		@media screen and (min-width: $lg) {
			padding: 60px 0;
		}
	}
}
</style>
