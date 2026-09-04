import type { GraphQlResponse } from '~~/shared/types'

interface SitemapRecord {
	slug: string | null
	_updatedAt: string
}

interface SitemapUrlsData {
	allBlogPosts: SitemapRecord[]
	allProjectPosts: SitemapRecord[]
}

/** Источник динамических адресов для @nuxtjs/sitemap: посты блога и проекты. */
export default defineEventHandler(async () => {
	const { datoCmsUrl, datoCmsReadOnlyPublishToken } = useRuntimeConfig()

	const graphqlQuery = `query SitemapUrls {
		allBlogPosts(first: 100) {
			slug
			_updatedAt
		}
		allProjectPosts(first: 100) {
			slug
			_updatedAt
		}
	}`

	const response = await $fetch<GraphQlResponse<SitemapUrlsData>>(datoCmsUrl, {
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

	const toUrls = (records: SitemapRecord[], prefix: string) =>
		records
			.filter(record => record.slug)
			.map(record => ({
				loc: `${prefix}/${record.slug}`,
				lastmod: record._updatedAt
			}))

	return [
		...toUrls(data.allBlogPosts, '/blog'),
		...toUrls(data.allProjectPosts, '/portfolio')
	]
})
