import { defineEventHandler } from 'h3'
import { openConnection } from "~/server/db";
import { events } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const idNum = parseInt(id as string, 10)

  if (!idNum) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing parameters',
    })
  }

  try {
    const db = openConnection()
    await db.delete(events)
      .where(eq(events.id, idNum))
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
