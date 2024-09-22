import { drizzle } from 'drizzle-orm/d1'

export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'
import { env } from 'process'

export const tables = schema

export function useDrizzle() {
    const db = hubDatabase()
    return drizzle(db, { schema })
}

export type User = typeof tables.users.$inferSelect
