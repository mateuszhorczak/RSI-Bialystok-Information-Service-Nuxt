import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { events } from './'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  dateCreation: text('date_creation').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}))
