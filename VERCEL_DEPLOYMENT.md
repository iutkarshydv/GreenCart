# GreenCart - Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Create a Vercel account at https://vercel.com

## Deployment Steps

### 1. Deploy Backend (API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. During deployment, Vercel will ask:
   - "Set up and deploy?" → Yes
   - "Which scope?" → Select your account
   - "Link to existing project?" → No (first time)
   - "What's your project's name?" → greencart-backend (or your choice)
   - "In which directory is your code located?" → ./ (press Enter)

5. After deployment, Vercel will provide a URL like: `https://greencart-backend.vercel.app`

6. **IMPORTANT**: Add environment variables in Vercel dashboard:
   - Go to: https://vercel.com/dashboard
   - Select your backend project
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file:
     - MONGODB_URI
     - JWT_SECRET
     - ADMIN_EMAIL
     - ADMIN_PASSWORD
     - CLOUDINARY_NAME
     - CLOUDINARY_API_KEY
     - CLOUDINARY_SECRET_KEY
     - STRIPE_SECRET_KEY
     - RAZORPAY_KEY_ID
     - RAZORPAY_KEY_SECRET
     - etc.
   - Save and redeploy

### 2. Deploy Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Update API URL in your code:
   - Create a `.env` file in frontend directory
   - Add: `VITE_BACKEND_URL=https://your-backend-url.vercel.app`
   - Update any hardcoded API URLs to use `import.meta.env.VITE_BACKEND_URL`

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Follow the same prompts as backend
   - Project name: greencart-frontend (or your choice)

5. After deployment, you'll get a URL like: `https://greencart-frontend.vercel.app`

### 3. Deploy Admin Panel

1. Navigate to the admin directory:
   ```bash
   cd ../admin
   ```

2. Update API URL in your code:
   - Create a `.env` file in admin directory
   - Add: `VITE_BACKEND_URL=https://your-backend-url.vercel.app`
   - Update any hardcoded API URLs to use `import.meta.env.VITE_BACKEND_URL`

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Follow the same prompts
   - Project name: greencart-admin (or your choice)

5. After deployment, you'll get a URL like: `https://greencart-admin.vercel.app`

## Alternative: Deploy via GitHub (Recommended)

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/greencart.git
git push -u origin main
```

### 2. Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Deploy each folder separately:

**Backend:**
- Click "Import"
- Set "Root Directory" to `backend`
- Click "Edit" and add all environment variables
- Click "Deploy"

**Frontend:**
- Import the same repo again
- Set "Root Directory" to `frontend`
- Add environment variables: `VITE_BACKEND_URL`
- Click "Deploy"

**Admin:**
- Import the same repo again
- Set "Root Directory" to `admin`
- Add environment variables: `VITE_BACKEND_URL`
- Click "Deploy"

## Post-Deployment Configuration

### 1. Update CORS in Backend
Update your backend CORS configuration to allow your deployed frontend and admin URLs:

```javascript
const allowedOrigins = [
  'https://greencart-frontend.vercel.app',
  'https://greencart-admin.vercel.app',
  'http://localhost:5173', // For local development
  'http://localhost:5174'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 2. Custom Domains (Optional)
- In Vercel dashboard, go to each project
- Click "Settings" → "Domains"
- Add your custom domain (e.g., api.greencart.com, app.greencart.com, admin.greencart.com)

### 3. Environment Variables Security
- Never commit `.env` files to GitHub
- Always add environment variables through Vercel dashboard
- Use different values for production vs development

## Testing

1. Test Backend API:
   ```bash
   curl https://your-backend-url.vercel.app/
   ```
   Should return: "API Working"

2. Test Frontend:
   - Visit your frontend URL
   - Test all functionality
   - Check browser console for errors

3. Test Admin:
   - Visit your admin URL
   - Test login and features

## Troubleshooting

### Backend Issues:
- Check Vercel logs: `vercel logs [deployment-url]`
- Ensure all environment variables are set
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Frontend/Admin Issues:
- Check if API URLs are correctly configured
- Verify CORS settings in backend
- Check browser console for errors

### Database Connection:
- MongoDB Atlas: Go to Network Access → Allow access from anywhere
- Or add Vercel IP ranges

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys to production
- Pull requests create preview deployments
- Can set up different branches for staging

## Monitoring

- View logs in Vercel dashboard
- Set up Vercel Analytics for performance monitoring
- Monitor API usage and errors

## Notes

- Serverless functions have a 10-second timeout on Hobby plan (60s on Pro)
- Cold starts may cause initial requests to be slower
- MongoDB connection pooling is handled automatically
- File uploads work with Cloudinary (already configured)

## Support

For issues:
- Check Vercel documentation: https://vercel.com/docs
- Review deployment logs in Vercel dashboard
- Ensure all dependencies are in package.json
