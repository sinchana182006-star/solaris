const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// SAVE FAVORITE PLANETS
// ===============================
router.put("/favorites", authMiddleware, async (req, res) => {
  try {
    const { favoritePlanets } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { favoritePlanets },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Favorites saved successfully 🚀",
      favoritePlanets: user.favoritePlanets,
    });
  } catch (error) {
    console.error("FAVORITES ERROR:", error);

    res.status(500).json({
      message: "Could not save favorites",
      error: error.message,
    });
  }
});

// ===============================
// SAVE QUIZ PROGRESS
// ===============================
router.put("/quiz-progress", authMiddleware, async (req, res) => {
  try {
    const { percentage } = req.body;

    console.log("QUIZ REQUEST:", {
      userId: req.userId,
      percentage,
    });

    // Validate percentage
    if (
      typeof percentage !== "number" ||
      percentage < 0 ||
      percentage > 100
    ) {
      return res.status(400).json({
        message: "Invalid quiz percentage",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Existing quiz progress
    const oldCompleted =
      user.quizProgress?.quizzesCompleted || 0;

    const oldAverage =
      user.quizProgress?.averageScore || 0;

    const oldBest =
      user.quizProgress?.bestScore || 0;

    // New values
    const newCompleted = oldCompleted + 1;

    const newAverage = Math.round(
      ((oldAverage * oldCompleted) + percentage) /
        newCompleted
    );

    const newBest = Math.max(
      oldBest,
      percentage
    );

    // Update user
    user.quizProgress = {
      quizzesCompleted: newCompleted,
      averageScore: newAverage,
      bestScore: newBest,
    };
    // ==============================
// UPDATE ACHIEVEMENTS
// ==============================

if (!user.achievements) {
  user.achievements = [];
}

if (
  newCompleted >= 1 &&
  !user.achievements.includes("First Quiz")
) {
  user.achievements.push("First Quiz");
}

if (
  percentage === 100 &&
  !user.achievements.includes("Perfect Score")
) {
  user.achievements.push("Perfect Score");
}

if (
  newCompleted >= 5 &&
  !user.achievements.includes("Quiz Explorer")
) {
  user.achievements.push("Quiz Explorer");
}

    await user.save();

    console.log(
      "QUIZ SAVED:",
      user.quizProgress
    );

    res.json({
      message: "Quiz progress saved successfully 🚀",
      quizProgress: user.quizProgress,
    });
  } catch (error) {
    console.error(
      "QUIZ PROGRESS ERROR:",
      error
    );

    res.status(500).json({
      message: "Could not save quiz progress",
      error: error.message,
    });
  }
});

module.exports = router;