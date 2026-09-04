import type { GraphQlResponse, BlogData } from '~~/shared/types'
import { DEFAULT_PER_PAGE } from '~~/shared/constants'

export default defineEventHandler(async event => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const query = getQuery(event)
	const limit = Number(query.limit) || DEFAULT_PER_PAGE
	const skip = Number(query.page) ? limit * (Number(query.page) - 1) : 0

	const graphqlQuery = `query Blog {
		_allBlogPostsMeta {
			count
		}
		allBlogPosts(first: ${limit}, skip: ${skip}) {
			id
			_createdAt
			title
			slug
			preview {
				id
				url
				alt
			}
		}
		blogPage {
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
		}
	}`

	const response = await $fetch<GraphQlResponse<BlogData>>(datoCmsUrl, {
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

	const { blogPage, allBlogPosts, _allBlogPostsMeta } = data

	if (!blogPage) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Запись blogPage не найдена в CMS',
			fatal: true
		})
	}

	return {
		blogPage,
		allBlogPosts,
		_allBlogPostsMeta
	}
})
