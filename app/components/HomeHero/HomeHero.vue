<script setup lang="ts">
import type { HeroData } from '~~/shared/types'

import { StructuredText as DatocmsStructuredText } from 'vue-datocms'

interface Props {
	content: HeroData
}

defineProps<Props>()

const { renderBlock } = useDatoRender()

const eye = ref<HTMLElement | null>(null)

function handleMouseMove(event: MouseEvent): void {
	if (!eye.value) return

	const rect = eye.value.getBoundingClientRect()
	const eyeCenterX = rect.left + rect.width / 2
	const eyeCenterY = rect.top + rect.height / 2

	const dx = event.clientX - eyeCenterX
	const dy = event.clientY - eyeCenterY

	const offsetX = Math.min(Math.max(dx * 0.1, -10), 10) // ограничим смещение по X
	const offsetY = Math.min(Math.max(dy * 0.1, -10), 10) // и по Y

	eye.value.style.transform = `translate(${offsetX}px, ${offsetY}px)`
}

onMounted(() => {
	document.body.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
	<PageSection class="home-hero">
		<div class="container">
			<div class="home-hero__wrapper">
				<div class="home-hero__texts">
					<div v-if="content.title" class="home-hero__heading">
						<h1 class="home-hero__title">{{ content.title }}</h1>
					</div>
					<DatocmsStructuredText
						class="home-hero__description"
						:data="content.text"
						:render-block="renderBlock"
					></DatocmsStructuredText>

					<template v-if="content.button && content.button.to">
						<UIButton
							:href="content.button.to"
							:label="content.button.label"
							leading-icon="icons:pdf"
							target="_blank"
							download
						/>
					</template>
				</div>
				<div class="home-hero__media">
					<div class="home-hero__media-container">
						<div class="home-hero__eye">
							<img
								ref="eye"
								src="~/assets/images/eye.svg"
								width="44"
								height="44"
								alt=""
							/>
						</div>
						<img
							class="home-hero__image"
							src="~/assets/images/mac.svg"
							width="288"
							height="227"
							alt=""
						/>
					</div>
				</div>
			</div>

			<div class="home-hero__quick-links">
				<slot />
			</div>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.home-hero.section {
	padding: 60px 0 0;

	@media screen and (min-width: $md) {
		padding: 80px 0 0;
	}

	@media screen and (min-width: $lg) {
		padding: 120px 0 0;
	}
}

.home-hero {
	&__wrapper {
		margin: 0 0 100px;
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 36px 72px;

		@media screen and (min-width: $lg) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			align-items: center;
			gap: 24px;
		}
	}

	&__title {
		@include typo-display-1;

		margin: 0 0 16px;
	}

	&__description {
		@include typo-paragraph-1;

		margin: 0 0 36px;
	}

	&__media-container {
		@media screen and (min-width: $lg) {
			position: relative;
			max-width: 612px;
		}
	}

	&__image {
		display: flex;
		width: 100%;
		height: auto;
	}

	&__eye {
		display: none;

		img {
			width: 50%;
			height: 50%;
		}

		@media screen and (min-width: $lg) {
			position: absolute;
			top: 50%;
			left: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;
			border-radius: 100%;
			width: 18%;
			aspect-ratio: 1 / 1;
			background-color: #fff;
			transform: translate(calc(-50% + 16px), calc(-50% - 12px));
		}

		@media screen and (min-width: $xl) {
			transform: translate(calc(-50% + 18px), calc(-50% - 14px));
		}
	}

	&__quick-links {
		position: relative;
		z-index: 10;
		margin: 0 0 -124px;

		@media screen and (min-width: $md) {
			margin: 0 0 -30px;
		}

		@media screen and (min-width: $lg) {
			margin: 0 0 -40px;
		}
	}
}
</style>
