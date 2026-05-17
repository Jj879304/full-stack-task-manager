const db = require("../../database");

// GET TASKS
const getTasks = (
  req,
  res
) => {
  db.all(
    "SELECT * FROM tasks",
    [],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              err.message
          });
      }

      res
        .status(200)
        .json(rows);
    }
  );
};

// CREATE TASK
const createTask = (
  req,
  res
) => {
  const { task } =
    req.body;

  if (!task) {
    return res
      .status(400)
      .json({
        message:
          "Task is required ❌"
      });
  }

  db.run(
    "INSERT INTO tasks (task) VALUES (?)",
    [task],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              err.message
          });
      }

      res
        .status(201)
        .json({
          id:
            this.lastID,
          task
        });
    }
  );
};

// UPDATE TASK
const updateTask = (
  req,
  res
) => {
  const { id } =
    req.params;

  const { task } =
    req.body;

  db.run(
    `
    UPDATE tasks
    SET task = ?
    WHERE id = ?
    `,
    [task, id],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              err.message
          });
      }

      res
        .status(200)
        .json({
          message:
            "Task updated 🔥"
        });
    }
  );
};

// DELETE TASK
const deleteTask = (
  req,
  res
) => {
  const { id } =
    req.params;

  db.run(
    `
    DELETE FROM tasks
    WHERE id = ?
    `,
    [id],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              err.message
          });
      }

      res
        .status(200)
        .json({
          message:
            "Task deleted 🔥"
        });
    }
  );
};

// TOGGLE COMPLETE TASK
const toggleTask = (
  req,
  res
) => {
  const { id } =
    req.params;

  db.run(
    `
    UPDATE tasks
    SET completed =
    NOT completed
    WHERE id = ?
    `,
    [id],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              err.message
          });
      }

      res
        .status(200)
        .json({
          message:
            "Task completed 🔥"
        });
    }
  );
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
};