import type { GraphQlResponse, ContactData } from '~~/shared/types'

export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query Contact {
		contactPage {
			_seoMetaTags {
				content
				tag
				attributes
			}
			hero {
				title
				text {
					value
				}
			}
		}
	}`

	const response = await $fetch<GraphQlResponse<ContactData>>(datoCmsUrl, {
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

	const { contactPage } = data

	if (!contactPage) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись homePage не найдена в CMS',
			fatal: true
		})
	}

	return { contactPage }
})
