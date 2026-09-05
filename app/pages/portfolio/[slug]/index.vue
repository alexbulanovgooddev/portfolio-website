<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

const route = useRoute()
const slug = Array.isArray(route.params['slug'])
	? (route.params['slug'] as string[]).join('/')
	: route.params['slug']

const { data, error } = await useAsyncData(`project-${slug}`, () =>
	$fetch(`/api/portfolio/${slug}`)
)

if (error.value) {
	throw createError({
		statusCode: error.value.status,
		statusMessage: error.value.message,
		fatal: true
	})
}

useHead(() => {
	if (!data.value) return {}

	return toHead(data.value.projectPost._seoMetaTags)
})

const { renderBlock } = useDatoRender()
</script>

<template>
	<main v-if="data">
		<PageSection pattern style="flex: 1">
			<div class="container">
				<WindowPanel>
					<template #header>
						<WindowPanelHeader :title="`${slug}.html`" />
					</template>

					<template #thumbnail>
						<WindowPanelThumbnail
							v-if="data.projectPost.preview"
							class="large"
							:thumbnail="data.projectPost.preview"
						/>
					</template>

					<template #default>
						<DatocmsStructuredText
							:data="data.projectPost.text"
							:render-block="renderBlock"
						/>
					</template>
				</WindowPanel>
			</div>
		</PageSection>

		<PageSection small>
			<PageSectionHeader title="Все проекты" />

			<div class="container">
				<NuxtLink to="/portfolio">Вернуться к проектам</NuxtLink>
			</div>
		</PageSection>
	</main>
</template>
