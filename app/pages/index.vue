<script setup lang="ts">
import { toHead } from 'vue-datocms'

const { data, error } = await useAsyncData('home', () => $fetch('/api/home'))

if (error.value) {
	throw createError({
		statusCode: error.value.status,
		statusMessage: error.value.message,
		fatal: true
	})
}

useHead(() => {
	if (!data.value) return {}

	return toHead(data.value.homePage._seoMetaTags)
})
</script>

<template>
	<main v-if="data">
		<HomeHero v-if="data.homePage.hero" :content="data.homePage.hero">
			<QuickLinks v-if="data.homePage.quick" :content="data.homePage.quick" />
		</HomeHero>
		<HomeRecents v-if="data.homePage.recent" :content="data.homePage.recent" />
	</main>
</template>
