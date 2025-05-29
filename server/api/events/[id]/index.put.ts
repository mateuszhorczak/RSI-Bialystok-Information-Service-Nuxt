import { defineEventHandler } from 'h3'
import type { Event } from '~/types'
import { openConnection } from "~/server/db"
import { eq } from 'drizzle-orm'
import { events } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const idNum = parseInt(id as string, 10)

  if (!idNum) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing parameters',
    })
  }

  const body = await readBody(event)
  if (!body.name.trim() || !body.description.trim() || !body.type.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing parameters',
    })
  }
  const eventToUpdate: Event = { ...body }

  try {
    const db = openConnection()
    await db.update(events)
      .set(eventToUpdate)
      .where(eq(events.id, idNum));
  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      // @ts-expect-error silence error
      data: error.message,
    })
  }
})
