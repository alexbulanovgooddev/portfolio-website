<script setup lang="ts">
import type { Media } from '~~/shared/types'
import type { CarouselSlide } from '@fancyapps/ui'

interface Props {
	content: Media
}

const props = defineProps<Props>()

const { $Fancybox } = useNuxtApp()

function handleExpand() {
	const slides: Partial<CarouselSlide>[] = [
		{
			src: props.content.url,
			type: 'image',
			alt: props.content.alt || ''
		}
	]

	$Fancybox.show(slides, { hideScrollbar: false })
}
</script>

<template>
	<WindowPanel class="achievements-card">
		<template #header>
			<WindowPanelHeader
				:title="`achievement.html`"
				expandable
				@expand="handleExpand"
			/>
		</template>

		<template #default>
			<img
				class="achievements-card__image"
				:src="content.url"
				width="264"
				height="370"
				:alt="content.alt || ''"
			/>
		</template>
	</WindowPanel>
</template>

<style lang="scss" scoped>
.achievements-card {
	&__image {
		display: flex;
		width: 100%;
		height: 100%;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
	}
}
</style>
