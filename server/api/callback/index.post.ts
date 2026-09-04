const escapeHtml = (str: string): string =>
	str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 3
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

const hitRateLimit = (key: string): boolean => {
	const now = Date.now()

	if (rateBuckets.size > 1000) {
		for (const [k, v] of rateBuckets) if (v.resetAt < now) rateBuckets.delete(k)
	}

	const bucket = rateBuckets.get(key)
	if (!bucket || bucket.resetAt < now) {
		rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
		return false
	}
	if (bucket.count >= RATE_MAX) return true
	bucket.count++
	return false
}

export default defineEventHandler(async event => {
	const { telegramBotToken, telegramChatId, allowedOrigins } =
		useRuntimeConfig()

	const alloweds = allowedOrigins
		.split(',')
		.map(origin => origin.trim())
		.filter(Boolean)

	const origin = getRequestHeader(event, 'origin')
	if (!origin || !alloweds.includes(origin)) {
		throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
	}

	const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
	if (hitRateLimit(ip)) {
		throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })
	}

	const body = await readBody(event)
	const { name, email, message } = body ?? {}

	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof message !== 'string'
	) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
	}

	const trimmedName = name.trim()
	const trimmedEmail = email.trim()
	const trimmedMessage = message.trim()

	if (
		!trimmedName ||
		!trimmedEmail ||
		!trimmedMessage ||
		trimmedName.length > 100 ||
		trimmedEmail.length > 200 ||
		trimmedMessage.length > 3000 ||
		!EMAIL_RE.test(trimmedEmail)
	) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
	}

	const safeName = escapeHtml(trimmedName)
	const safeEmail = escapeHtml(trimmedEmail)
	const safeMessage = escapeHtml(trimmedMessage)

	const text =
		`<b>От:</b> ${safeName}\n` +
		`<b>Почта:</b> <a href="mailto:${safeEmail}">${safeEmail}</a>\n` +
		`<b>Сообщение:</b>\n<pre>${safeMessage}</pre>`

	const baseUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

	const response = await $fetch(baseUrl, {
		method: 'POST',
		body: {
			chat_id: telegramChatId,
			parse_mode: 'HTML',
			text
		},
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
})
