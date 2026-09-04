import type { GraphQlResponse, ProjectData } from '~~/shared/types'

export default defineEventHandler(async event => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()
	const slug = getRouterParam(event, 'slug')

	const graphqlQuery = `query Project($slug: String!) {
		projectPost(filter: {slug: {eq: $slug}}) {
			_seoMetaTags {
				content
				tag
				attributes
			}
			_createdAt
			slug
			title
			technologies {
				id
				label
				logo
			}
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
					... on StackRecord {
						id
						technologies {
							id
							label
							logo
						}
					}
				}
			}
			preview {
				id
				url
				alt
			}
		}
	}`

	const response = await $fetch<GraphQlResponse<ProjectData>>(datoCmsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${datoCmsReadOnlyPublishToken}`
		},
		body: {
			query: graphqlQuery,
			variables: { slug }
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

	const { projectPost } = data

	if (!projectPost) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись homePage не найдена в CMS',
			fatal: true
		})
	}

	return { projectPost }
})
