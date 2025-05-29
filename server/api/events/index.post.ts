import { defineEventHandler } from 'h3'
import { openConnection } from '~/server/db'
import { events } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name.trim() || !body.description.trim() || !body.type.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing parameters',
    })
  }

  try {
    const db = openConnection()

    const newEvent = {
      ...body,
      dateCreation: new Date().toISOString(),
    }
    await db.insert(events).values(newEvent)
  }
  catch (error) {
    console.error('Error processing request:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
