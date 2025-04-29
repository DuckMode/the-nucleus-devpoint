import { pool } from './index.js';
import { seedUsers } from './seeds/users.js';
// Import other seed functions

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Run seeds in order
    await seedUsers();
    // Run other seeds...

    console.log('✅ Seeding completed');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
