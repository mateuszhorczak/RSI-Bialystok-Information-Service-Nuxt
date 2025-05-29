import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { users } from './'

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  type: text('type').notNull(),
  date: text('date').notNull(),
  description: text('description').notNull(),
  dateCreation: text('date_creation').notNull(),
  week: integer(),
  month: integer(),
  year: integer(),
})

export const eventsRelations = relations(events, ({ one, many }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
}))
