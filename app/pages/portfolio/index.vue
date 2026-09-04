<script setup lang="ts">
import { toHead } from 'vue-datocms'
import { DEFAULT_PER_PAGE } from '~~/shared/constants'

const { perPage } = storeSetup()
const route = useRoute()

const limit = perPage ?? DEFAULT_PER_PAGE

const { data, error, status, refresh } = await useAsyncData('portfolio', () =>
	$fetch('/api/portfolio', {
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

	return toHead(data.value.portfolioPage._seoMetaTags)
})

const pending = computed(() => status.value === 'pending')
const projects = computed<Project[]>(() => data.value?.allProjectPosts ?? [])
const pageTotal = computed(() =>
	Math.ceil((data.value?._allProjectPostsMeta.count ?? 0) / limit)
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
		<BlogHero
			v-if="data.portfolioPage.hero"
			:content="data.portfolioPage.hero"
		/>
		<PageSection pattern small style="flex: 1">
			<PortfolioFeed :projects="projects" />
			<UIPagination
				v-if="pageTotal > 1"
				:page-total="pageTotal"
				:disabled="pending"
			/>
		</PageSection>
	</main>
</template>
