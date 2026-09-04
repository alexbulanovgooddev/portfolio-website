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
	<PageSection class="about-hero" pattern>
		<div class="container">
			<WindowPanel>
				<template #header>
					<WindowPanelHeader :title="`about.html`" />
				</template>

				<template #default>
					<div class="user-content">
						<h1>{{ content.title }}</h1>

						<DatocmsStructuredText
							:data="content.text"
							:render-block="renderBlock"
						/>

						<UIButton
							v-if="content.button"
							:href="content.button.to"
							:label="content.button.label"
							target="_blank"
							download
						/>
					</div>
				</template>
			</WindowPanel>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.about-hero {
	:deep(img) {
		border-radius: 50%;
		display: flex;
		width: 100%;

		@media screen and (min-width: $md) {
			margin-top: 12px;
			margin-right: 24px;
			margin-bottom: 12px;
			width: 200px;
			float: left;
		}
	}
}
</style>
