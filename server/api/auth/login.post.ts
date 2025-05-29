import { eq } from 'drizzle-orm'
import argon2 from 'argon2'
import { generateJwtToken } from '~/server/jwtModule'
import { users } from '~/server/db/schema'
import { openConnection } from '~/server/db'

export default defineEventHandler(async (event) => {
  const db = openConnection()
  const body = await readBody(event)

  try {
    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Wymagane nazwa użytkownika i hasło!',
      })
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, body.username),
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Użytkownik o podanej nazwie nie istnieje.',
      })
    }

    const isMatch = await argon2.verify(user.password, body.password)
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nieprawidłowe hasło',
      })
    }

    const { password, ...userWithoutPassword } = user

    return {
      token: generateJwtToken(event, userWithoutPassword),
      user: userWithoutPassword,
    }
  }
  catch (error) {
    console.error('Login error:', error)

    // @ts-expect-error type error silence
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
