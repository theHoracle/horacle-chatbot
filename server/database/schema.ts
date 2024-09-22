import {integer, sqliteTable, text, } from 'drizzle-orm/sqlite-core'
import { sql } from "../utils/database"
import { createId } from '@paralleldrive/cuid2'

export const users = sqliteTable('users', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name'),
    email: text('email').unique().notNull(),
    username: text('username').unique(),
    avatar: text('avatar'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})