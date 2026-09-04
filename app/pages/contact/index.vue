<script setup lang="ts">
import { toHead } from 'vue-datocms'

const { data, error } = await useAsyncData('contact', () =>
	$fetch('/api/contact/')
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

	return toHead(data.value.contactPage._seoMetaTags)
})
</script>

<template>
	<main v-if="data">
		<ContactHero
			v-if="data.contactPage.hero"
			:content="data.contactPage.hero"
			style="flex: 1"
		/>
	</main>
</template>
