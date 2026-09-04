<script setup lang="ts">
import type { HeroData } from '~~/shared/types'

import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

interface Props {
	content: HeroData
}

defineProps<Props>()

const { renderBlock } = useDatoRender()
</script>

<template>
	<PageSection class="blog-hero" small>
		<PageSectionHeader :title="content.title" />

		<div class="container">
			<DatocmsStructuredText :data="content.text" :render-block="renderBlock" />
		</div>
	</PageSection>
</template>
