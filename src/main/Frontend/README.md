# Quiz Application

A modern React-based quiz application with authentication, quiz functionality, and leaderboard.

## Features

- 🔐 **User Authentication** - Login and signup functionality
- 📝 **Interactive Quiz** - Multiple choice questions with instant feedback
- 🏆 **Leaderboard** - Track and compare scores with other users
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile devices

## API Endpoints

The application integrates with the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Quiz
- `GET /api/quiz` - Fetch quiz questions
- `POST /api/quiz/check` - Verify answer

### Leaderboard
- `POST /api/leaderboard/submit-score` - Submit quiz score
- `GET /api/leaderboard` - Get leaderboard rankings

## Installation

1. Install dependencies:
```bash
npm install
```

2. Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-api-url.com'; // Change this
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── Home.js/css          # Landing page
│   ├── Login.js             # Login form
│   ├── Signup.js            # Registration form
│   ├── Auth.css             # Auth components styling
│   ├── Quiz.js/css          # Quiz interface
│   ├── Leaderboard.js/css   # Leaderboard display
│   ├── Navbar.js/css        # Navigation bar
│   └── ProtectedRoute.js    # Route protection
├── context/
│   └── AuthContext.js       # Authentication state management
├── services/
│   └── api.js               # API integration
├── App.js                   # Main app component with routing
├── index.js                 # App entry point
└── index.css                # Global styles
```

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account using email and password
3. **Take Quiz**: Answer multiple-choice questions and get instant feedback
4. **View Results**: See your score at the end of the quiz
5. **Check Leaderboard**: Compare your performance with other users

## Technologies Used

- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 with gradients and animations

## Configuration

To connect to your backend API, modify the `API_BASE_URL` constant in [src/services/api.js](src/services/api.js):

```javascript
const API_BASE_URL = 'http://localhost:3000'; // Your API URL
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT
