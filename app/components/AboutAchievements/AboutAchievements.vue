<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AboutAchievementData } from '~~/shared/types'

interface Props {
	content: AboutAchievementData
}

const props = defineProps<Props>()

const DRAG_IGNORE = 'button, a, input, textarea, select, [role="button"]'
const CARD_W = 320
const CARD_H = 480

interface Card extends Media {
	x: number
	y: number
	z: number
	rotate: number
}

const board = ref<HTMLElement | null>(null)
const cards = ref<Card[]>(
	props.content.gallery.map(media => ({
		...media,
		x: 0,
		y: 0,
		z: 1,
		rotate: 0
	}))
)
const draggingId = ref<string | null>(null)
const activeCard = ref<Card | null>(null)

let topZ = props.content.gallery.length
let offsetX = 0
let offsetY = 0

function rand(min: number, max: number) {
	return min + Math.random() * (max - min)
}

function bounds(rect: DOMRect) {
	return {
		maxX: Math.max(0, rect.width - CARD_W),
		maxY: Math.max(0, rect.height - CARD_H)
	}
}

function scatter() {
	const rect = board.value?.getBoundingClientRect()

	if (!rect) return

	const { maxX, maxY } = bounds(rect)

	cards.value.forEach(card => {
		card.x = rand(0, maxX)
		card.y = rand(0, maxY)
		card.z = Math.floor(rand(1, props.content.gallery.length))
		card.rotate = rand(-7, 7)
	})
	topZ = props.content.gallery.length
}

function clamp(value: number, max: number) {
	return Math.min(Math.max(value, 0), max)
}

function styleFor(card: Card): CSSProperties {
	return {
		transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
		zIndex: card.z,
		position: 'absolute'
	}
}

function keepInside() {
	const rect = board.value?.getBoundingClientRect()
	if (!rect) return

	const { maxX, maxY } = bounds(rect)

	cards.value.forEach(card => {
		card.x = clamp(card.x, maxX)
		card.y = clamp(card.y, maxY)
	})
}

function bringToFront(card: Card) {
	card.z = ++topZ
}

function handlePointerMove(event: PointerEvent) {
	const card = activeCard.value
	const rect = board.value?.getBoundingClientRect()

	if (!card || !rect) return

	const { maxX, maxY } = bounds(rect)

	card.x = clamp(event.clientX - rect.left - offsetX, maxX)
	card.y = clamp(event.clientY - rect.top - offsetY, maxY)
}

function handlePointerUp(event: PointerEvent) {
	activeCard.value = null
	draggingId.value = null

	const el = event.currentTarget

	if (!(el instanceof HTMLElement)) return

	el.releasePointerCapture(event.pointerId)
	el.removeEventListener('pointermove', handlePointerMove)
	el.removeEventListener('pointerup', handlePointerUp)
	el.removeEventListener('pointercancel', handlePointerUp)
}

function handlePointerDown(event: PointerEvent, card: Card) {
	bringToFront(card)

	const el = event.currentTarget
	const target = event.target
	const rect = board.value?.getBoundingClientRect()

	activeCard.value = card
	draggingId.value = card.id

	if (!(el instanceof HTMLElement) || !(target instanceof Element) || !rect)
		return
	if (!target.closest('.window-panel-header')) return
	if (target.closest(DRAG_IGNORE)) return

	offsetX = event.clientX - rect.left - card.x
	offsetY = event.clientY - rect.top - card.y

	el.setPointerCapture(event.pointerId)
	el.addEventListener('pointermove', handlePointerMove)
	el.addEventListener('pointerup', handlePointerUp)
	el.addEventListener('pointercancel', handlePointerUp)
}

onMounted(() => {
	scatter()
	window.addEventListener('resize', keepInside)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', keepInside)
})
</script>

<template>
	<PageSection class="about-achievements">
		<PageSectionHeader class="visually-hidden" :title="content.title" />

		<div ref="board" class="about-achievements__board">
			<AchievementsCard
				v-for="card in cards"
				:key="card.id"
				:content="card"
				class="about-achievements__card"
				:class="{ 'is-dragging': card.id === draggingId }"
				:style="styleFor(card)"
				tabindex="0"
				@pointerdown="handlePointerDown($event, card)"
			/>
		</div>
	</PageSection>
</template>

<style lang="scss" scoped>
.about-achievements.section {
	padding: 0;
}

.about-achievements {
	border-bottom: 4px solid var(--color-text);
	background-color: var(--color-surface);

	&__board {
		position: relative;
		height: 720px;
		overflow: hidden;
	}

	&__card {
		user-select: none;
		touch-action: none;
		width: 320px;
		height: 480px;
	}
}
</style>
