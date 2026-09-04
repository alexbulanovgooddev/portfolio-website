<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
	<div>
		<NuxtLoadingIndicator :height="8" :color="`var(--color-chrome)`" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>

		<ModalsContainer />
	</div>
</template>
