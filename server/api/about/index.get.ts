import type { GraphQlResponse, AboutData } from '~~/shared/types'

export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query About {
		aboutPage {
			_seoMetaTags {
				content
				tag
				attributes
			}
			hero {
				title
				text {
				  value
					blocks {
						__typename,
						... on ImageBlockRecord {
						 	id
							image {
								id
								url
								alt
							}
						}
					}
				}
				button {
					id
					label
					to
				}
			}
			achievement {
				title
				gallery {
					id
					url
					alt
				}
			}
		}
	}`

	const response = await $fetch<GraphQlResponse<AboutData>>(datoCmsUrl, {
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

	const { aboutPage } = data

	if (!aboutPage) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись homePage не найдена в CMS',
			fatal: true
		})
	}

	return { aboutPage }
})
