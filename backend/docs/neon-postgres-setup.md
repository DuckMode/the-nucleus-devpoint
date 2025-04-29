# Setting up Neon PostgreSQL Database

Neon is a serverless PostgreSQL service that separates storage and compute to offer autoscaling, branching, and bottomless storage.

## Setup Steps

1. **Sign up for Neon**:
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up for a free account

2. **Create a new project**:
   - After signing in, click on "New Project"
   - Give your project a name (e.g., "the-nucleus-devpoint")
   - Select a region closest to your users
   - Click "Create Project"

3. **Get your connection string**:
   - Once your project is created, you'll see a connection string
   - It will look something like: `postgres://[user]:[password]@[endpoint]/[database]`
   - Copy this connection string

4. **Update your .env file**:
   - Replace the existing DATABASE_URL with your Neon connection string:
   ```
   DATABASE_URL=postgres://[user]:[password]@[endpoint]/[database]
   ```

5. **Test the connection**:
   - Run your application to verify the connection works
   - Or use a simple test script to connect to the database

## Benefits of Using Neon

- **Serverless**: No need to manage database servers
- **Auto-scaling**: Scales compute resources based on demand
- **Branching**: Create database branches for development and testing
- **Cost-effective**: Pay only for what you use
- **PostgreSQL 17 support**: Access to the latest PostgreSQL features

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Node.js Connection Guide](https://neon.tech/docs/guides/node)
- [Drizzle ORM with Neon](https://neon.tech/docs/guides/drizzle)
