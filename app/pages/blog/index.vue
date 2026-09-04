<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { DEFAULT_PER_PAGE } from '~~/shared/constants'

const { perPage } = storeSetup()
const route = useRoute()

const limit = perPage ?? DEFAULT_PER_PAGE

const { data, error, status, refresh } = await useAsyncData('blog', () =>
	$fetch('/api/blog', {
		query: { limit, page: route.query.page ?? 1 }
	})
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

	return toHead(data.value.blogPage._seoMetaTags)
})

const pending = computed(() => status.value === 'pending')
const posts = computed<Post[]>(() => data.value?.allBlogPosts ?? [])
const pageTotal = computed(() =>
	Math.ceil((data.value?._allBlogPostsMeta.count ?? 0) / limit)
)

watch(
	() => route.query.page,
	async () => {
		await refresh()

		if (error.value) {
			throw createError({
				statusCode: error.value.status,
				statusMessage: error.value.message,
				fatal: true
			})
		}

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
)
</script>

<template>
	<main v-if="data">
		<BlogHero v-if="data.blogPage.hero" :content="data.blogPage.hero" />
		<PageSection pattern small style="flex: 1">
			<BlogFeed :posts="posts" />
			<UIPagination
				v-if="pageTotal > 1"
				:page-total="pageTotal"
				:disabled="pending"
			/>
		</PageSection>
	</main>
</template>
