import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '../services/api';
import './QuizSelection.css';

const QuizSelection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      setError('');
      // Get list of available quizzes from backend
      const data = await quizAPI.getQuizzes();
      setQuizzes(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load quizzes.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleSelectQuiz = (quizId) => {
    // Navigate to quiz with selected quiz ID
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return <div className="quiz-selection-container"><div className="loading">Loading quizzes...</div></div>;
  }

  if (error) {
    return <div className="quiz-selection-container"><div className="error">{error}</div></div>;
  }

  if (quizzes.length === 0) {
    return <div className="quiz-selection-container"><div className="error">No quizzes available</div></div>;
  }

  return (
    <div className="quiz-selection-container">
      <div className="selection-card">
        <h1>Select a Quiz</h1>
        <p className="subtitle">Choose a quiz to test your knowledge</p>
        
        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <div className="quiz-header-info">
                <h3>{quiz.name}</h3>
                <p className="quiz-category">{quiz.category}</p>
              </div>
              
              <p className="quiz-description">{quiz.description}</p>
              
              <div className="quiz-meta">
                <span className="quiz-difficulty">{quiz.difficulty}</span>
                <span className="quiz-count">{quiz.questionCount} Questions</span>
              </div>
              
              <button 
                onClick={() => handleSelectQuiz(quiz.id)}
                className="btn-start-quiz"
              >
                Start Quiz →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;
