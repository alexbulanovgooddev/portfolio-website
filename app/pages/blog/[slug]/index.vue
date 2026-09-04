<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

const route = useRoute()
const slug = Array.isArray(route.params['slug'])
	? (route.params['slug'] as string[]).join('/')
	: route.params['slug']

const { data, error } = await useAsyncData(`post-${slug}`, () =>
	$fetch(`/api/blog/${slug}`)
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

	return toHead(data.value.blogPost._seoMetaTags)
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
							v-if="data.blogPost.preview"
							class="large"
							:thumbnail="data.blogPost.preview"
						/>
					</template>

					<template #default>
						<div class="container">
							<DatocmsStructuredText
								:data="data.blogPost.content"
								:render-block="renderBlock"
							/>
						</div>
					</template>
				</WindowPanel>
			</div>
		</PageSection>

		<PageSection small>
			<PageSectionHeader title="Все статьи" />

			<div class="container">
				<NuxtLink to="/blog">Вернуться к статьям</NuxtLink>
			</div>
		</PageSection>
	</main>
</template>
