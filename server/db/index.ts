import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from "./schema"

export const openConnection = () => {
  const client = createClient({ url: process.env.DB_FILE_NAME! })
  return drizzle({ client, schema })
}
