import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './index.js';

// Run migrations
async function runMigrations() {
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await pool.end();
  }
}

runMigrations();
