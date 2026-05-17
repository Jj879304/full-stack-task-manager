const express =
  require("express");

const cors =
  require("cors");

const app =
  express();

// IMPORT MIDDLEWARE
const logger =
  require(
    "./data/middleware/logger"
  );

// IMPORT ROUTES
const taskRoutes =
  require(
    "./data/routes/tasks"
  );

// MIDDLEWARE
app.use(
  express.json()
);

app.use(
  cors({
    origin:
      "http://localhost:3000"
  })
);

app.use(logger);

// ROUTES
app.use(
  "/tasks",
  taskRoutes
);

// HOME ROUTE
app.get(
  "/",
  (req, res) => {
    res.send(
      "Task Manager Backend Running 🔥"
    );
  }
);

// TEST ROUTE
app.get(
  "/test",
  (req, res) => {
    res.json({
      message:
        "Backend working perfectly 🔥"
    });
  }
);

// START SERVER
const PORT = 3001;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );

    console.log(
      "Connected to SQLite database 🔥"
    );
  }
);