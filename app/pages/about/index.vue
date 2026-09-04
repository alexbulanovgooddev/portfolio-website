<script setup lang="ts">
import { toHead } from 'vue-datocms'

const { data, error } = await useAsyncData('about', () => $fetch('/api/about'))

if (error.value) {
	throw createError({
		statusCode: error.value.status,
		statusMessage: error.value.message,
		fatal: true
	})
}

useHead(() => {
	if (!data.value) return {}

	return toHead(data.value.aboutPage._seoMetaTags)
})
</script>

<template>
	<main v-if="data">
		<AboutHero v-if="data.aboutPage.hero" :content="data.aboutPage.hero" />
		<AboutAchievements
			v-if="data.aboutPage.achievement"
			:content="data.aboutPage.achievement"
		/>
	</main>
</template>
