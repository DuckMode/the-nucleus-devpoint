import { db, pool } from './index.js';
import { users } from './schema.js';
import { sql } from 'drizzle-orm';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log(`Database URL: ${process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@')}`);

    // Test a simple query
    const result = await db.select({ count: sql`count(*)` }).from(users);

    console.log('Connection successful!');
    console.log('User count:', result[0].count);

    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  } finally {
    // Close the connection
    await pool.end();
  }
}

// Run the test if this file is executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  testConnection()
    .then(success => {
      if (!success) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

export default testConnection;
