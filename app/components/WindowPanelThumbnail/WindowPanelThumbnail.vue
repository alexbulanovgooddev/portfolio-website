<script setup lang="ts">
import type { Media } from '~~/shared/types'

interface Props {
	thumbnail: Media
}

defineProps<Props>()
</script>

<template>
	<div class="window-panel-thumbnail">
		<img
			class="window-panel-thumbnail__img"
			:src="thumbnail.url"
			width="280"
			height="160"
			:alt="thumbnail.alt || ''"
		/>
	</div>
</template>

<style lang="scss" scoped>
.window-panel-thumbnail {
	border-bottom: 4px solid var(--color-canvas);
	height: 160px;
	filter: grayscale(100%);

	&__img {
		display: flex;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.window-panel-thumbnail.large {
	height: 300px;
}
</style>
