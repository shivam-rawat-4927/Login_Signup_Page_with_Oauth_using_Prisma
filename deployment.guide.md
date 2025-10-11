# Deployment Guide

This guide provides step-by-step instructions for deploying the Login/Signup Page application with OAuth using Prisma. The application consists of:

- **Backend**: Node.js/Express API with Prisma ORM and MySQL database
- **Frontend**: React application

## 🚀 Quick Overview

- **Backend Deployment**: [Render](https://render.com) (Free tier available)
- **Frontend Deployment**: [Vercel](https://vercel.com) (Free tier available)
- **Database**: MySQL (PlanetScale, Railway, or Render PostgreSQL)

---

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

- [ ] GitHub account with your project repository
- [ ] Render account (for backend deployment)
- [ ] Vercel account (for frontend deployment)
- [ ] Database service account (PlanetScale, Railway, or similar)

---

## 🗄️ Database Setup

### Option 1: PlanetScale (Recommended)

1. **Create PlanetScale Account**
   - Go to [PlanetScale](https://planetscale.com)
   - Sign up for a free account

2. **Create Database**
   ```bash
   # Install PlanetScale CLI (optional)
   npm install -g @planetscale/cli
   
   # Or create via web interface
   ```
   - Create a new database named `login-signup-db`
   - Create a `main` branch

3. **Get Connection String**
   - Navigate to your database dashboard
   - Go to "Connect" → "Prisma"
   - Copy the `DATABASE_URL`

### Option 2: Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub

2. **Create MySQL Database**
   - Click "New Project" → "Provision MySQL"
   - Note down the connection details

### Option 3: Render PostgreSQL

1. **Create PostgreSQL Database on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "PostgreSQL"
   - Choose free tier
   - Note the connection string

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. **Update package.json**
   
   Ensure your `backend/package.json` has the correct start script:
   ```json
   {
     "scripts": {
       "start": "node index.js",
       "build": "npm install && npx prisma generate && npx prisma db push"
     }
   }
   ```

2. **Create render.yaml (Optional)**
   
   Create `render.yaml` in your project root:
   ```yaml
   services:
     - type: web
       name: login-signup-backend
       env: node
       buildCommand: cd backend && npm install && npx prisma generate
       startCommand: cd backend && npm start
       envVars:
         - key: DATABASE_URL
           sync: false
         - key: JWT_SECRET
           sync: false
         - key: NODE_ENV
           value: production
   ```

### Step 2: Deploy to Render

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: `login-signup-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   
   Add the following environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=production
   PORT=10000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://your-app.onrender.com`)

### Step 3: Database Migration

After deployment, run database migrations:

1. **Using Render Shell** (if available):
   ```bash
   npx prisma db push
   ```

2. **Or add to build command**:
   ```bash
   npm install && npx prisma generate && npx prisma db push
   ```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Update API Base URL**
   
   Create or update `frontend/src/config.js`:
   ```javascript
   const config = {
     API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
   };
   
   export default config;
   ```

2. **Update API Calls**
   
   Replace localhost URLs in your API calls with the config:
   ```javascript
   import config from './config';
   
   // Instead of: axios.get('http://localhost:5001/api/users')
   axios.get(`${config.API_BASE_URL}/api/users`)
   ```

3. **Update package.json**
   
   Ensure build script exists in `frontend/package.json`:
   ```json
   {
     "scripts": {
       "build": "react-scripts build"
     }
   }
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (Optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Set Environment Variables**
   
   Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-app.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-app.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Configure DNS records as instructed

---

## 🔐 Environment Variables Reference

### Backend (.env)
```bash
# Database
DATABASE_URL="mysql://username:password@host:port/database"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT=10000
NODE_ENV=production

# CORS (if needed)
FRONTEND_URL="https://your-frontend.vercel.app"
```

### Frontend (.env)
```bash
REACT_APP_API_URL="https://your-backend.onrender.com"
```

---

## 🔄 CORS Configuration

Update your backend CORS configuration to allow your frontend domain:

```javascript
// backend/index.js
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000', // Development
    'https://your-frontend.vercel.app', // Production
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

---

## 🧪 Testing Your Deployment

### Backend Testing
```bash
# Test backend health
curl https://your-backend.onrender.com/health

# Test API endpoints
curl https://your-backend.onrender.com/api/users
```

### Frontend Testing
1. Visit your Vercel URL
2. Test login/signup functionality
3. Check browser console for errors
4. Verify API calls are reaching your backend

---

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check database service is running
   - Ensure IP whitelist includes Render's IPs

2. **CORS Errors**
   - Update CORS configuration in backend
   - Verify frontend URL is whitelisted

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs for specific errors

4. **Prisma Issues**
   - Run `npx prisma generate` after schema changes
   - Use `npx prisma db push` for schema deployment
   - Check database connection string format

### Useful Commands

```bash
# Check Prisma status
npx prisma db pull

# Reset database (use with caution)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

---

## 📱 Mobile Responsiveness

Ensure your React app is mobile-responsive:

1. **Add viewport meta tag** (should already be in `public/index.html`):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

2. **Test on different screen sizes**
3. **Use responsive CSS units**

---

## 🔒 Security Considerations

### Production Checklist

- [ ] Use strong JWT secret (minimum 32 characters)
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Keep dependencies updated

### Environment Variables Security

- Never commit `.env` files to version control
- Use different secrets for different environments
- Rotate secrets regularly
- Use secret management services for sensitive data

---

## 📊 Monitoring and Logging

### Render Monitoring
- Check logs in Render dashboard
- Set up health checks
- Monitor resource usage

### Vercel Analytics
- Enable Vercel Analytics for frontend monitoring
- Monitor Core Web Vitals
- Track user interactions

---

## 🔄 Continuous Deployment

### Auto-Deploy Setup

1. **Render**: Automatically deploys on git push to main branch
2. **Vercel**: Automatically deploys on git push to main branch

### Manual Deploy Commands

```bash
# Redeploy backend on Render
curl -X POST "https://api.render.com/deploy/srv-YOUR_SERVICE_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Redeploy frontend on Vercel
vercel --prod
```

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs
3. Consult platform documentation:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Prisma Docs](https://www.prisma.io/docs)

---

## 🎉 Congratulations!

Your Login/Signup application is now deployed and ready for users! 

**Your deployed application:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`

Remember to:
- Monitor your application performance
- Keep dependencies updated
- Backup your database regularly
- Monitor usage to stay within free tier limits
