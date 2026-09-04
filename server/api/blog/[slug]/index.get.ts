import type { GraphQlResponse, PostData } from '~~/shared/types'

export default defineEventHandler(async event => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()
	const slug = getRouterParam(event, 'slug')

	const graphqlQuery = `query Post($slug: String!) {
		blogPost(filter: {slug: {eq: $slug}}) {
			_seoMetaTags {
				content
				tag
				attributes
			}
			_createdAt
			slug
			title
			content {
				value
			}
			preview {
				id
				url
				alt
			}
		}
	}`

	const response = await $fetch<GraphQlResponse<PostData>>(datoCmsUrl, {
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

	const { blogPost } = data

	if (!blogPost) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись homePage не найдена в CMS',
			fatal: true
		})
	}

	return { blogPost }
})
