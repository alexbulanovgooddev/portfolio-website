<script setup lang="ts">
import type { Project } from '~~/shared/types'

interface Props {
	projects: Project[]
}

defineProps<Props>()
</script>

<template>
	<div class="portfolio-feed">
		<div class="container">
			<div class="portfolio-feed__wrapper">
				<template v-if="projects.length > 0">
					<ProjectCard
						v-for="project in projects"
						:key="project.id"
						:project="project"
					/>
				</template>
				<template v-else>
					<h2>Здесь пока ничего нет</h2>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.portfolio-feed {
	&__wrapper {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 36px;

		@media screen and (min-width: $lg) {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
</style>
