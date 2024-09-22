// File: server/api/users.ts

import { drizzle } from 'drizzle-orm/d1';
import { users } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
  
  const db = useDrizzle()
  if(!db)  {
    throw new Error('Database connection not available');
  }
  
  try {
    const result = await db.select().from(users).all()
    console.log('result', result);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});