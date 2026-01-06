import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leaderboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await leaderboardAPI.getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load leaderboard');
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <p>Top performers in the quiz</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="no-data">
            <p>No scores yet. Be the first to take the quiz!</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = user && entry.email === user.email;
              
              return (
                <div 
                  key={index} 
                  className={`leaderboard-item ${isCurrentUser ? 'current-user' : ''} ${index < 3 ? 'top-three' : ''}`}
                >
                  <div className="rank">
                    {getRankIcon(index)}
                  </div>
                  <div className="user-info">
                    <div className="username">
                      {entry.username}
                      {isCurrentUser && <span className="you-badge">You</span>}
                    </div>
                    <div className="email">{entry.email}</div>
                  </div>
                  <div className="score-badge">
                    {entry.score}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="leaderboard-actions">
          <button onClick={() => navigate('/quiz-selection')} className="btn-primary">
            Take Quiz
          </button>
          <button onClick={loadLeaderboard} className="btn-secondary">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
