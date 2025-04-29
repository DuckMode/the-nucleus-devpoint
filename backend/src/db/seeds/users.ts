import { db } from '../index.js';
import { users } from '../schema.js';
import { eq } from 'drizzle-orm';

export async function seedUsers() {
  console.log('Checking for existing users...');

  // Define the seed data
  const seedData = [
    {
      email: 'john@example.com',
      password: '$2b$10$6bEwzRQhwVVqkH5kTsJZ4eJnyxf6KEPtG9GY6JrJ.4vx7M/h2RoTe', // hashed password for 'password123'
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      email: 'jane@example.com',
      password: '$2b$10$6bEwzRQhwVVqkH5kTsJZ4eJnyxf6KEPtG9GY6JrJ.4vx7M/h2RoTe', // hashed password for 'password123'
      firstName: 'Jane',
      lastName: 'Smith'
    }
  ];

  // Check if users already exist
  const existingUsers = await Promise.all(
    seedData.map(user =>
      db.select().from(users).where(eq(users.email, user.email)).limit(1)
    )
  );

  // Filter out users that already exist
  const usersToInsert = seedData.filter((_, index) =>
    existingUsers[index].length === 0
  );

  if (usersToInsert.length === 0) {
    console.log('All seed users already exist in the database.');
    // Return existing users
    return await db.select().from(users).where(
      eq(users.email, 'john@example.com')
    ).limit(2);
  }

  console.log(`Inserting ${usersToInsert.length} new users...`);
  return await db.insert(users).values(usersToInsert).returning();
}
