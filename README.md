# Daily Coding Platform

A full-stack web application for daily coding challenges built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- **User Authentication**: JWT-based authentication with role-based access (Student, Faculty, Admin)
- **Daily Coding Challenges**: Students receive one coding question per day
- **Code Submission**: Submit solutions and track progress
- **Admin Dashboard**: Manage questions, users, and view analytics
- **Faculty Dashboard**: Monitor student progress and performance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Vanilla JavaScript** - Interactivity

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/daily-coding-platform.git
   cd daily-coding-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/dailyCoding
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5000
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and go to: `http://localhost:5000`

## Default Login Credentials

### Admin
- Email: `admin@dailycoding.com`
- Password: `admin123`

### Sample Student
- Email: `student@test.com` (after registration)
- Password: `student123`

## Project Structure

```
daily-coding-platform/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/           # Business logic
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── facultyController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # Authentication middleware
│   ├── models/                # Database models
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Submission.js
│   │   └── Analytics.js
│   ├── routes/                # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── facultyRoutes.js
│   │   └── studentRoutes.js
│   ├── index.js               # Main server file
│   ├── seed.js                # Database seeding
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── *.html                 # HTML pages
│   ├── *.css                  # Stylesheets
│   └── images/                # Static assets
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Student
- `GET /api/student/dashboard` - Get student dashboard
- `GET /api/student/getTodayQuestion` - Get today's question
- `POST /api/student/submitAnswer` - Submit code solution
- `GET /api/student/getSubmissions` - Get submission history

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/questions` - Get all questions
- `POST /api/admin/questions` - Add new question
- `PUT /api/admin/questions/:id` - Update question
- `DELETE /api/admin/questions/:id` - Delete question

### Faculty
- `GET /api/faculty/dashboard` - Get faculty dashboard
- `GET /api/faculty/students` - Get student list
- `GET /api/faculty/analytics` - Get analytics data

## Deployment

### For Production
1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set `CLIENT_URL` to your domain
4. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "daily-coding"
   ```

### Environment Variables for Production
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dailyCoding
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
PORT=5000
CLIENT_URL=https://yourdomain.com
```

### Deploying Frontend to Vercel (proxying API)

1. Install the Vercel CLI (optional) and login:
```bash
npm i -g vercel
vercel login
```

2. In your Vercel project settings, add an environment variable named `BACKEND_URL` pointing to your deployed backend API (e.g. `https://my-backend.example.com`). This proxy forwards `/api/*` to that backend.

3. From the repository root, run:
```bash
vercel --prod
```

Vercel will serve the `frontend/` folder as static files and forward any `/api/*` calls to the backend URL you configured. Ensure your backend enables CORS for the Vercel domain or sets `CLIENT_URL` accordingly.

### Deploying Frontend to Netlify

1. In Netlify, create a new site from Git and choose this repository.
2. Set the `Publish directory` to `frontend`.
3. Add an environment variable `BACKEND_URL` with the public URL of your backend.
4. Add `_redirects` (already in the `frontend/` folder) or use `netlify.toml` (present at repo root) to proxy `/api/*` to your backend and to fallback to `index.html` for SPA routes.

Note: Replace `https://YOUR_BACKEND_URL` in `frontend/_redirects` or `netlify.toml` with your actual backend URL or use Netlify's `NETLIFY_REDIRECTS_PLUGIN` features.


### Automatic Backend Deploy (GitHub Actions → Heroku Container)

You can set up automatic deployment of the backend Docker image to Heroku when you push to `main`.

1. In your GitHub repository, add the following Secrets:
   - `HEROKU_API_KEY` — your Heroku account API key
   - `HEROKU_APP_NAME` — the name of your Heroku app (example: `daily-coding-backend`)

2. The repository already includes a GitHub Actions workflow at `.github/workflows/deploy-backend.yml` that builds a Docker image from `backend/`, pushes it to Heroku Container Registry, and releases it.

3. Ensure your Heroku app has the required config vars set (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, `CLIENT_URL`).

4. Push to `main` to trigger the workflow.



## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ for CHRIST University students**