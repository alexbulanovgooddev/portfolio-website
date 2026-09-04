import type { GraphQlResponse, LayoutData } from '~~/shared/types'

export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query Layout {
		layout {
			copyright
			navigation {
				id
				label
				to
				dropdownElements {
					id
					label
					to
				}
			}
		}
	}`

	const response = await $fetch<GraphQlResponse<LayoutData>>(datoCmsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${datoCmsReadOnlyPublishToken}`
		},
		body: {
			query: graphqlQuery
		}
	})

	const { data, errors } = response

	if (errors) {
		throw createError({
			statusCode: 500,
			statusMessage: errors.map(error => error.message).join(', '),
			fatal: true
		})
	}

	const { layout } = data

	if (!layout) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Запись layout не найдена в CMS',
			fatal: true
		})
	}

	return { layout }
})
