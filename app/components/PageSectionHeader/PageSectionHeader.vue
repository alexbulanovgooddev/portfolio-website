<script setup lang="ts">
interface Props {
	title?: string | null
}

defineProps<Props>()
</script>

<template>
	<div v-if="$slots.default || title" class="page-section-header">
		<div class="container">
			<h2 class="page-section-header__title">
				<slot>{{ title }}</slot>
			</h2>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page-section-header {
	margin: 0 0 16px;

	@media screen and (min-width: $md) {
		margin: 0 0 32px;
	}

	&__title {
		@include typo-display-2;
	}
}
</style>
