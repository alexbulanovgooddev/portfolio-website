<script setup lang="ts">
import type { Post } from '~~/shared/types'

interface Props {
	posts: Post[]
}

defineProps<Props>()
</script>

<template>
	<div class="blog-feed">
		<div class="container">
			<div class="blog-feed__wrapper">
				<template v-if="posts.length > 0">
					<BlogCard v-for="post in posts" :key="post.id" :post="post" />
				</template>
				<template v-else>
					<h2>Здесь пока ничего нет</h2>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.blog-feed {
	&__wrapper {
		& > * + * {
			margin-top: 36px;
		}
	}
}
</style>
