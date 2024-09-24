import {index, integer, sqliteTable, text, } from 'drizzle-orm/sqlite-core'
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

export const games = sqliteTable('games', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    userId: text('user_id').references(() => users.id),
    score: integer('score'),
    gameOver: integer('game_over').default(0), // 0 for not over 1 for over
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
    scoreIndex: index('score_idx').on(table.score),
}))

export const gameMessages = sqliteTable('game_messages', {
    id: text('id').primaryKey().$defaultFn(() => createId()),      
    gameId: text('game_id').references(() => games.id),            // Refers to the game this message belongs to
    role: text('role'),                                            // 'user' or 'model'
    message: text('message'),                                      // The message content
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`), // Timestamp of when the message was sent
});
