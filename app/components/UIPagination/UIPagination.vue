<script setup lang="ts">
interface Props {
	pageTotal: number
	max?: number
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	max: 5
})

const route = useRoute()
const router = useRouter()

const currentPage = computed<number>({
	get() {
		return route.query.page ? Number(route.query.page) : 1
	},
	set(newValue) {
		const query = { ...route.query }

		if (newValue === 1) {
			delete query.page
		} else {
			query.page = String(newValue)
		}

		router.push({ query })
	}
})

const rangeStart = computed<number>(() => {
	if (currentPage.value === 1) {
		return 1
	}

	if (currentPage.value === props.pageTotal) {
		return props.pageTotal - props.max > 0 ? props.pageTotal - props.max + 1 : 1
	}

	return currentPage.value - 1
})

const rangeEnd = computed<number>(() => {
	return Math.min(rangeStart.value + props.max - 1, props.pageTotal)
})

const croppedPages = computed(() => {
	const range = []

	for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
		range.push(i)
	}

	return range
})

function handleChangePage(page: number): void {
	currentPage.value = page
}
</script>

<template>
	<ul class="ui-pagination">
		<li
			class="ui-pagination__item ui-pagination__item_first"
			:class="{ hidden: currentPage === 1 }"
		>
			<a
				class="ui-pagination__link"
				:class="{ disabled: currentPage === 1 }"
				href="#"
				@click.prevent="!disabled && handleChangePage(1)"
			>
				<span> Первая </span>
			</a>
		</li>
		<li
			class="ui-pagination__item ui-pagination__item_prev"
			:class="{ hidden: currentPage === 1 }"
		>
			<a
				class="ui-pagination__link"
				:class="{ disabled: currentPage === 1 }"
				href="#"
				@click.prevent="!disabled && handleChangePage(currentPage - 1)"
			>
				<NuxtIcon class="ui-pagination__icon" name="arrow-back" filled />
				<span class="ui-pagination__label"> Предыдущая </span>
			</a>
		</li>

		<li v-for="(page, i) in croppedPages" :key="i" class="ui-pagination__item">
			<a
				class="ui-pagination__link"
				:class="{
					disabled: disabled || Number(page) === currentPage,
					current: Number(page) === currentPage
				}"
				href="#"
				@click.prevent="!disabled && handleChangePage(page)"
				>{{ page }}</a
			>
		</li>

		<li
			class="ui-pagination__item ui-pagination__item_next"
			:class="{ hidden: currentPage === pageTotal }"
		>
			<a
				class="ui-pagination__link"
				:class="{ disabled: currentPage === pageTotal }"
				href="#"
				@click.prevent="handleChangePage(currentPage + 1)"
			>
				<span class="ui-pagination__label"> Следующая </span>
				<NuxtIcon class="ui-pagination__icon" name="arrow-forward" filled />
			</a>
		</li>
		<li
			class="ui-pagination__item ui-pagination__item_last"
			:class="{ hidden: currentPage === pageTotal }"
		>
			<a
				class="ui-pagination__link"
				:class="{ disabled: currentPage === pageTotal }"
				href="#"
				@click.prevent="handleChangePage(pageTotal)"
			>
				<span> Последняя </span>
			</a>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
.ui-pagination {
	display: flex;
	justify-content: center;
	padding: 24px 0 0;
	text-align: center;
	list-style: none;

	&__item {
		display: flex;
		align-items: center;

		&_first,
		&_last {
			display: none;

			@media screen and (min-width: $md) {
				display: flex;
			}
		}

		&_next,
		&_prev,
		&_first,
		&_last {
			&.hidden {
				display: none;
			}
		}
	}

	&__item:not(:last-of-type) {
		margin-right: 12px;
	}

	&__link {
		display: flex;
		align-items: center;
		line-height: 1;
		text-decoration: none;
		color: var(--color-ink);
		opacity: 0.8;

		& > * + * {
			margin-left: 8px;
		}

		&:not(.disabled):hover,
		&:not(.disabled):focus-visible {
			opacity: 1;
		}

		&.disabled,
		&.current {
			pointer-events: none;
		}

		&.current {
			color: var(--color-ink);
		}
	}

	&__icon.nuxt-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;

		& > * {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
