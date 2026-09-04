import type { GraphQlResponse, HomeData } from '~~/shared/types'

export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query Home {
		homePage {
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
				button {
					id
					label
					to
				}
			}
			quick {
				title
				links {
					id
					label
					to
				}
			}
			recent {
				title
				projects {
					id
					_createdAt
					slug
					title
					description {
						value
					}
					categories {
						id
						label
						value
					}
					preview {
						id
						url
						alt
					}
				}
    	}
		}
	}`

	const response = await $fetch<GraphQlResponse<HomeData>>(datoCmsUrl, {
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

	const { homePage } = data

	if (!homePage) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись homePage не найдена в CMS',
			fatal: true
		})
	}

	return { homePage }
})
