import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizAPI, leaderboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  const [quizTitle, setQuizTitle] = useState('Quiz');
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!quizId) {
        navigate('/quiz-selection');
        return;
      }
      
      const endpoint = `/api/quiz/${quizId}`;
      const data = await quizAPI.getQuestions(endpoint);
      
      if (!Array.isArray(data) || data.length === 0) {
        setError('No quiz questions available. Please contact the administrator.');
        setLoading(false);
        return;
      }
      
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load questions. Please check your backend connection.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    try {
      const result = await quizAPI.checkAnswer(currentQuestion.id, selectedAnswer);
      
      setIsAnswered(true);
      setFeedback({
        correct: result.correct,
        correctAnswer: result.correctAnswer
      });

      if (result.correct) {
        setScore(score + 1);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to verify answer';
      alert(errorMsg);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsAnswered(false);
      setFeedback(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      setSubmittingScore(true);
      // Submit score with quiz ID if available
      const scoreData = {
        score: score,
        quizId: quizId
      };
      await leaderboardAPI.submitScore(scoreData);
      setQuizCompleted(true);
    } catch (err) {
      console.error('Failed to submit score:', err);
      // Still complete quiz even if score submission fails
      setQuizCompleted(true);
    } finally {
      setSubmittingScore(false);
    }
  };

  if (loading) {
    return <div className="quiz-container"><div className="loading">Loading questions...</div></div>;
  }

  if (error) {
    return <div className="quiz-container"><div className="error">{error}</div></div>;
  }

  if (questions.length === 0) {
    return <div className="quiz-container"><div className="error">No questions available</div></div>;
  }

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card completed">
          <h1>Quiz Completed! 🎉</h1>
          <div className="final-score">
            <p>Your Score</p>
            <h2>{score} / {questions.length}</h2>
            <p className="percentage">{Math.round((score / questions.length) * 100)}%</p>
          </div>
          <div className="completion-buttons">
            <button onClick={() => navigate('/leaderboard')} className="btn-primary">
              View Leaderboard
            </button>
            <button onClick={() => window.location.reload()} className="btn-secondary">
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = ['A', 'B', 'C', 'D'];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <div className="progress-info">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="score">Score: {score}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="question-section">
          <h2>{currentQuestion.question}</h2>
        </div>

        <div className="options-section">
          {options.map((option) => {
            const optionKey = `option${option}`;
            const optionValue = currentQuestion[optionKey];
            const isSelected = selectedAnswer === option;
            const isCorrect = feedback && feedback.correctAnswer === option;
            const isWrong = feedback && isSelected && !feedback.correct;

            let className = 'option-button';
            if (isAnswered) {
              if (isCorrect) className += ' correct';
              else if (isWrong) className += ' wrong';
              else className += ' disabled';
            } else if (isSelected) {
              className += ' selected';
            }

            return (
              <button
                key={option}
                className={className}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                <span className="option-letter">{option}</span>
                <span className="option-text">{optionValue}</span>
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.correct ? 'correct-feedback' : 'wrong-feedback'}`}>
            {feedback.correct ? (
              <p>✓ Correct! Well done!</p>
            ) : (
              <p>✗ Incorrect. The correct answer was {feedback.correctAnswer}.</p>
            )}
          </div>
        )}

        <div className="quiz-actions">
          {!isAnswered ? (
            <button onClick={handleSubmitAnswer} className="btn-primary">
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="btn-primary" disabled={submittingScore}>
              {submittingScore ? 'Submitting...' : currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
