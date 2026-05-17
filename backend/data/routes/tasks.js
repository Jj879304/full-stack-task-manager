const express =
  require("express");

const router =
  express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} = require(
  "../controllers/taskController"
);

// GET TASKS
router.get(
  "/",
  getTasks
);

// CREATE TASK
router.post(
  "/",
  createTask
);

// UPDATE TASK
router.put(
  "/:id",
  updateTask
);

// COMPLETE TASK
router.put(
  "/complete/:id",
  toggleTask
);

// DELETE TASK
router.delete(
  "/:id",
  deleteTask
);

module.exports =
  router;