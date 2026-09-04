import type { Nav } from './Nav'

export interface Layout {
	copyright: string | null
	navigation: Nav[]
}

export interface LayoutData {
	layout: Layout | null
}
