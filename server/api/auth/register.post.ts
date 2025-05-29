import argon2 from 'argon2'
import { openConnection } from '~/server/db'
import { users } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const db = openConnection()
  const body = await readBody(event)

  try {
    if (!body.username || !body.password || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Wszystkie pola są wymagane!',
      })
    }

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, body.username),
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Nazwa użytkownika jest zajęta.',
      })
    }

    const existingEmail = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, body.email),
    })

    if (existingEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Podany adres email ma już przypisane konto.',
      })
    }

    const hashedPassword = await argon2.hash(body.password)

    const [newUser] = await db.insert(users).values({
      username: body.username,
      password: hashedPassword,
      email: body.email,
      dateCreation: new Date().toISOString(),
    }).returning()

    const { password, ...userWithoutPassword } = newUser

    setResponseStatus(event, 201)
    return {
      success: true,
      data: userWithoutPassword,
    }
  }
  catch (error) {
    console.error('Registration error:', error)

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
