<script setup lang="ts">
import type { Project } from '~~/shared/types'

import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

interface Props {
	project: Project
}

const props = defineProps<Props>()

const panelHeaderTitle = computed<string>(() => `${props.project.slug}.html`)
const linkTo = computed<string>(() => `/portfolio/${props.project.slug}/`)
</script>

<template>
	<WindowPanel class="project-card">
		<template #header>
			<WindowPanelHeader :title="panelHeaderTitle" />
		</template>

		<template v-if="project.preview" #thumbnail>
			<WindowPanelThumbnail :thumbnail="project.preview" />
		</template>

		<template #default>
			<h3 class="project-card__title">
				{{ project.title }}
			</h3>
			<DatocmsStructuredText
				class="project-card__description"
				:data="project.description"
			/>
			<div class="project-card__actions">
				<UIButton :to="linkTo" label="Подробнее о проекте" />
			</div>
		</template>
	</WindowPanel>
</template>

<style lang="scss" scoped>
.project-card {
	width: 100%;
	height: 100%;

	&__title {
		@include typo-display-3;

		margin: 0 0 12px;
	}

	&__categories {
		margin: 0 0 24px;
	}

	&__description {
		@include typo-paragraph-3;

		margin: 0 0 24px;
	}

	&__actions {
		margin-top: auto;
	}
}
</style>
