import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      // Find the user by ID from the JWT payload
      const userResults = await db
        .select()
        .from(users)
        .where(eq(users.id, jwtPayload.id))
        .limit(1);

      const user = userResults[0];

      if (user) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = user;
        return done(null, userWithoutPassword);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
