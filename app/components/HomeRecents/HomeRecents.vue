<script setup lang="ts">
import type { HomeRecentData } from '~~/shared/types'

import { view } from '~~/shared/constants'

interface Props {
	content: HomeRecentData
}

defineProps<Props>()

const { $gsap, $ScrollTrigger } = useNuxtApp()

const root = ref<HTMLElement | null>(null)
const clip = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

let mediaQuery: gsap.MatchMedia | null = null

function getScrollDistance(): number {
	if (!root.value || !track.value) return 0

	const styles = getComputedStyle(root.value)
	const visibleWidth =
		root.value.clientWidth -
		parseFloat(styles.paddingLeft) -
		parseFloat(styles.paddingRight)

	return Math.max(0, track.value.scrollWidth - visibleWidth)
}

onMounted(() => {
	mediaQuery = $gsap.matchMedia()

	mediaQuery.add(
		{
			isDesktop: `(min-width: ${view.lg}px)`,
			isReduced: '(prefers-reduced-motion: reduce)'
		},
		context => {
			const { isDesktop, isReduced } = context.conditions ?? {}

			if (!isDesktop || isReduced) return
			if (!root.value || !track.value || getScrollDistance() === 0) return

			const tween = $gsap.to(track.value, {
				x: () => -getScrollDistance(),
				ease: 'none'
			})

			$ScrollTrigger.create({
				trigger: root.value,
				start: 'top center-=30%',
				end: () => `+=${getScrollDistance()}`,
				pin: clip.value,
				scrub: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				animation: tween
			})
		}
	)
})

onBeforeUnmount(() => {
	mediaQuery?.revert()
	mediaQuery = null
})
</script>

<template>
	<PageSection class="home-recents" pattern>
		<div ref="clip" class="home-recents__clip">
			<PageSectionHeader :title="content.title" />

			<div ref="root" class="container">
				<div ref="track" class="home-recents__wrapper">
					<div
						v-for="project in content.projects"
						:key="project.id"
						class="home-recents__slide"
					>
						<ProjectCard class="home-recents__project" :project="project" />
					</div>
				</div>
			</div>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.home-recents {
	padding: 148px 0 74px;
	background-color: var(--color-surface);

	@media screen and (min-width: $md) {
		padding: 74px 0;
	}

	&__clip {
		overflow: hidden;
	}

	&__wrapper {
		& > * + * {
			margin-top: 36px;
		}

		@media screen and (min-width: $lg) {
			display: flex;
			flex-direction: row;
			width: fit-content;

			& > * + * {
				margin-top: 0;
				margin-left: 50px;
			}
		}
	}

	&__slide {
		@media screen and (min-width: $lg) {
			flex-shrink: 0;
			max-width: 680px;
		}
	}
}
</style>
