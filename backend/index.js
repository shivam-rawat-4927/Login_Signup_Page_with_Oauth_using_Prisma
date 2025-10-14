import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import session from 'express-session';
import connectDB from './db/index.js';
import prisma from './db/prismaInstance.js';
import dotenv from 'dotenv';
import AuthRoutes from './routes/authRoutes.js'

dotenv.config();
// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  
}));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' || false }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {email: profile.emails[0].value},
          {providerId: profile.id, provider: 'google'}
        ]
      }
    });

    if (user) {
      // update provider info if needed
      if (!user.providerId) {
        user = await prisma.user.update({
          where: {id: user.id},
          data: {
            providerId: profile.id,
            provider: 'google',
            avatar: profile.photos[0]?.value
          }
        });
      }
      return done(null, user);
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.emails[0].value.split('@')[0] + '_' + profile.id.slice(-4),
        providerId: profile.id,
        provider: 'google',
        avatar: profile.photos[0]?.value
      }
    });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {email: profile.emails?.[0]?.value}, 
          {providerId: profile.id, provider: 'github'}
        ]
      }
    });

    if (user) {
      // update provider info if needed
      if (!user.providerId) {
        user = await prisma.user.update({
          where: {id: user.id},
          data: {
            providerId: profile.id,
            provider: 'github',
            avatar: profile.photos?.[0]?.value
          }
        });
      }
      return done(null, user);
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
        firstName: profile.displayName.split(' ')[0] || profile.username,
        lastName: profile.displayName.split(' ').slice(1).join(' ') || '',
        username: profile.username,
        providerId: profile.id,
        provider: 'github',
        avatar: profile.photos?.[0]?.value
      }
    });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({where: {id}});
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Login/Signup API with Prisma and MySQL',
    status: 'running'
  });
});

// routes
app.use('/api/auth',AuthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
