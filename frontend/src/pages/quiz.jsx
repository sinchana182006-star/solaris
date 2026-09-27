import { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import { saveQuizProgress } from "../services/api";

const categories = [
  {
    id: "solar-system",
    name: "Solar System",
    icon: "🌍",
  },
  {
    id: "sun",
    name: "The Sun",
    icon: "☀️",
  },
  {
    id: "planets",
    name: "Planets",
    icon: "🪐",
  },
  {
    id: "missions",
    name: "Space Missions",
    icon: "🚀",
  },
  {
    id: "astronomy",
    name: "Astronomy Basics",
    icon: "🌌",
  },
];

const planetQuestions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Mars", "Venus", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Which is the largest planet in the Solar System?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "Which planet is famous for its rings?",
    options: ["Mars", "Saturn", "Mercury", "Venus"],
    answer: "Saturn",
  },
  {
    question: "Which planet is known for having a Great Red Spot?",
    options: ["Jupiter", "Mars", "Neptune", "Venus"],
    answer: "Jupiter",
  },
];

const sunQuestions = [
  {
    question: "What is the Sun?",
    options: [
      "A planet",
      "A star",
      "A moon",
      "An asteroid",
    ],
    answer: "A star",
  },
  {
    question: "What is the main gas found in the Sun?",
    options: [
      "Hydrogen",
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
    ],
    answer: "Hydrogen",
  },
  {
    question: "What provides the Sun's energy?",
    options: [
      "Nuclear fusion",
      "Burning coal",
      "Chemical reactions",
      "Electricity",
    ],
    answer: "Nuclear fusion",
  },
  {
    question: "Which layer is the visible surface of the Sun?",
    options: [
      "Core",
      "Photosphere",
      "Corona",
      "Radiative zone",
    ],
    answer: "Photosphere",
  },
  {
    question: "What is the outer atmosphere of the Sun called?",
    options: [
      "Corona",
      "Mantle",
      "Troposphere",
      "Crust",
    ],
    answer: "Corona",
  },
];

const missionQuestions = [
  {
    question: "Which mission was the first human Moon landing?",
    options: [
      "Apollo 11",
      "Voyager 1",
      "Cassini",
      "James Webb",
    ],
    answer: "Apollo 11",
  },
  {
    question: "Which spacecraft explored Saturn and its moons?",
    options: [
      "Cassini",
      "Apollo 11",
      "Voyager 1",
      "James Webb",
    ],
    answer: "Cassini",
  },
  {
    question:
      "Which spacecraft launched in 1977 and explored the outer Solar System?",
    options: [
      "Voyager 1",
      "Apollo 11",
      "Cassini",
      "James Webb",
    ],
    answer: "Voyager 1",
  },
  {
    question:
      "What is the James Webb Space Telescope mainly used for?",
    options: [
      "Studying distant objects in space",
      "Landing humans on Mars",
      "Exploring Earth's oceans",
      "Studying Earth's weather",
    ],
    answer: "Studying distant objects in space",
  },
  {
    question:
      "Which planet has been explored by many robotic missions?",
    options: [
      "Mars",
      "Mercury",
      "Venus",
      "Neptune",
    ],
    answer: "Mars",
  },
];

const astronomyQuestions = [
  {
    question: "What is a galaxy?",
    options: [
      "A large collection of stars, gas, and dust",
      "A single planet",
      "A type of asteroid",
      "A spacecraft",
    ],
    answer: "A large collection of stars, gas, and dust",
  },
  {
    question:
      "What force keeps planets in orbit around the Sun?",
    options: [
      "Gravity",
      "Magnetism",
      "Electricity",
      "Friction",
    ],
    answer: "Gravity",
  },
  {
    question: "What is a light-year used to measure?",
    options: [
      "Distance",
      "Time",
      "Temperature",
      "Mass",
    ],
    answer: "Distance",
  },
  {
    question: "What is Earth's natural satellite?",
    options: [
      "The Moon",
      "Mars",
      "The Sun",
      "Venus",
    ],
    answer: "The Moon",
  },
  {
    question: "Which galaxy contains our Solar System?",
    options: [
      "Milky Way",
      "Andromeda",
      "Sombrero",
      "Whirlpool",
    ],
    answer: "Milky Way",
  },
];

const solarSystemQuestions = [
  {
    question: "How many planets are in our Solar System?",
    options: ["7", "8", "9", "10"],
    answer: "8",
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "Which planet is the largest in the Solar System?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question:
      "Which planet is known for its prominent ring system?",
    options: ["Mars", "Saturn", "Venus", "Mercury"],
    answer: "Saturn",
  },
  {
    question: "What is at the center of our Solar System?",
    options: [
      "Earth",
      "The Moon",
      "The Sun",
      "Jupiter",
    ],
    answer: "The Sun",
  },
];

const questions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Mars", "Venus", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Which is the largest planet in the Solar System?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "Which planet is famous for its rings?",
    options: ["Mars", "Saturn", "Mercury", "Venus"],
    answer: "Saturn",
  },
  {
    question: "How many natural moons does Earth have?",
    options: ["1", "2", "4", "0"],
    answer: "1",
  },
];

function Quiz() {
  const navigate = useNavigate();
   const location= useLocation();
  const [started, setStarted] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(location.state?.score ?? 0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFinished] = useState(location.state?.showResult || false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const activeQuestions =
    selectedCategory === "planets"
      ? planetQuestions
      : selectedCategory === "sun"
      ? sunQuestions
      : selectedCategory === "missions"
      ? missionQuestions
      : selectedCategory === "astronomy"
      ? astronomyQuestions
      : selectedCategory === "solar-system"
      ? solarSystemQuestions
      : questions;

  const question = activeQuestions[currentQuestion];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === question.answer;

    if (!isCorrect) {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: question.question,
          selectedAnswer: selectedAnswer,
          correctAnswer: question.answer,
        },
      ]);
    }

    const finalScore = score + (isCorrect ? 1 : 0);

    if (isCorrect) {
      setScore(finalScore);
    }

    if (currentQuestion === activeQuestions.length - 1) {
      const percentage = Math.round(
        (finalScore / activeQuestions.length) * 100
      );

      const previousResults = JSON.parse(
        localStorage.getItem("solarisQuizResults") || "[]"
      );

      const newResult = {
        score: finalScore,
        total: activeQuestions.length,
        percentage: percentage,
        date: new Date().toISOString(),
      };

      const updatedResults = [
        ...previousResults,
        newResult,
      ];

      localStorage.setItem(
        "solarisQuizResults",
        JSON.stringify(updatedResults)
      );

      saveQuizProgress(percentage).catch((error) => {
        console.error(
          "Could not save quiz progress:",
          error
        );
      });

      setSelectedAnswer("");
      setFinished(true);
    } else {
      setScore(finalScore);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setFinished(false);
    setWrongAnswers([]);
  };

  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="quiz-label">
            SOLARIS / QUIZ
          </div>

          <h1>Solaris Quiz</h1>

          <p>
            Test your knowledge of the Solar System.
          </p>

          <h2>Choose a Category</h2>

          <div className="quiz-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`quiz-category ${
                  selectedCategory === category.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category.id)
                }
              >
                <span>{category.icon}</span>
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>

          <div className="quiz-info">
            <span>5 Questions</span>
            <span>•</span>
            <span>Multiple Choice</span>
          </div>

          <button
            className="quiz-button"
            onClick={() => setStarted(true)}
            disabled={!selectedCategory}
          >
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / activeQuestions.length) * 100
    );

    return (
      <div className="quiz-page">
        <div className="quiz-container result-card">
          <div className="quiz-label">
            QUIZ COMPLETE
          </div>

          <h1>Your Result</h1>

          <div className="score-number">
            {score}/{activeQuestions.length}
          </div>

          <h2>{percentage}%</h2>

          <p>
            You completed the Solaris Solar System Quiz.
          </p>

          <div className="quiz-result-actions">
            <button
              className="quiz-button"
             onClick={() =>
  navigate("/quiz/review", {
    state: {
      wrongAnswers,
      score,
      totalQuestions: activeQuestions.length,
      percentage,
      showResult:true,
    },
  })
}
>
              Review Answers →
            </button>

            <button
              className="quiz-button"
              onClick={restartQuiz}
            >
              Try Again →
            </button>

            <button
              className="quiz-button notes-button"
              onClick={() => navigate("/notes")}
            >
              📝 Cosmic Notes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-top">
          <span>
            Question {currentQuestion + 1} /{" "}
            {activeQuestions.length}
          </span>

          <span>
            Score: {score}
          </span>
        </div>

        <div className="quiz-label">
          SOLARIS / QUIZ
        </div>

        <h1>{question.question}</h1>

        <div className="quiz-options">
          {question.options.map((option) => (
            <button
              key={option}
              className={`quiz-option ${
                selectedAnswer === option
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="quiz-button"
          disabled={!selectedAnswer}
          onClick={handleNext}
        >
          {currentQuestion === activeQuestions.length - 1
            ? "Finish Quiz →"
            : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;