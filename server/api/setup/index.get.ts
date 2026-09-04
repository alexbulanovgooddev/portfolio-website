import type { GraphQlResponse, SetupData } from '~~/shared/types'

export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query Setup {
		setup {
			perPage
		}
	}`

	const response = await $fetch<GraphQlResponse<SetupData>>(datoCmsUrl, {
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

	const { setup } = data

	if (!setup) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Запись setup не найдена в CMS',
			fatal: true
		})
	}

	return { setup }
})
