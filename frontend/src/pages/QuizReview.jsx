import { useLocation, useNavigate } from "react-router-dom";

function QuizReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const wrongAnswers = location.state?.wrongAnswers || [];

  return (
    <div className="quiz-review-page">
      <main className="quiz-review-main">
        <p className="quiz-review-label">SOLARIS / QUIZ REVIEW</p>

        <h1>Review Answers</h1>

        <p className="quiz-review-intro">
          Review the concepts you missed and learn the correct answers.
        </p>

        {wrongAnswers.length === 0 ? (
          <div className="quiz-review-empty">
            <div className="quiz-review-success">✓</div>

            <h2>Perfect Score!</h2>

            <p>
              You answered every question correctly.
            </p>
          </div>
        ) : (
          <div className="quiz-review-list">
            {wrongAnswers.map((item, index) => (
              <div
                className="quiz-review-card"
                key={index}
              >
                <span className="quiz-review-number">
                  QUESTION {String(index + 1).padStart(2, "0")}
                </span>

                <h2>{item.question}</h2>

                <div className="quiz-answer wrong">
                  <span>YOUR ANSWER</span>

                  <strong>
                    ✕ {item.selectedAnswer}
                  </strong>
                </div>

                <div className="quiz-answer correct">
                  <span>CORRECT ANSWER</span>

                  <strong>
                    ✓ {item.correctAnswer}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="quiz-review-actions">
          <button
            className="quiz-secondary-button"
            onClick={() => navigate("/quiz", { state: { showResult: true } })}
          >
            ← Back to Quiz Results
          </button>

          <button
            className="quiz-primary-button"
            onClick={() => navigate("/quiz")}
          >
            Take Quiz Again
          </button>
        </div>
      </main>
    </div>
  );
}

export default QuizReview;