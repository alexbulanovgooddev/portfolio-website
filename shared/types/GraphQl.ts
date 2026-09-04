export interface GraphQlError {
	message: string
	locations?: { line: number; column: number }[]
	path?: (string | number)[]
	extensions?: Record<string, unknown>
}

export interface GraphQlResponse<T> {
	data: T
	errors?: GraphQlError[]
}

export interface CollectionMeta {
	count: number
}
