import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">🎓 Quiz Platform</div>
          <h1 className="home-title">
            Master Your Knowledge with <span className="gradient-text">QuizMaster</span>
          </h1>
          {isAuthenticated && (
            <p className="welcome-user">
              Welcome back, <span>{user.username}</span>! 👋
            </p>
          )}
          <p className="home-subtitle">
            Test your knowledge across multiple categories, compete with thousands of players,
            <br />and climb the global leaderboard to become the ultimate QuizMaster!
          </p>
          
          <div className="home-actions">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate('/quiz-selection')} className="btn-large btn-primary">
                  🎯 Start Quiz Now
                </button>
                <button onClick={() => navigate('/leaderboard')} className="btn-large btn-secondary">
                  🏆 View Rankings
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/signup')} className="btn-large btn-primary">
                  🚀 Get Started Free
                </button>
                <button onClick={() => navigate('/login')} className="btn-large btn-secondary">
                  👤 Login
                </button>
              </>
            )}
          </div>
        </div>

        
        
        

        
      </div>
    </div>
  );
};

export default Home;
