import {
  useState,
  useEffect
} from "react";

import "./App.css";

function App() {
  const [task, setTask] =
    useState("");

  const [tasks, setTasks] =
    useState([]);

  // LOAD TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:3001/tasks"
          );

        const data =
          await response.json();

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

  // ADD TASK
  const addTask =
    async () => {
      if (task === "")
        return;

      try {
        await fetch(
          "http://localhost:3001/tasks",
          {
            method:
              "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify({
                task
              })
          }
        );

        setTask("");

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  // DELETE TASK
  const deleteTask =
    async (id) => {
      try {
        await fetch(
          `http://localhost:3001/tasks/${id}`,
          {
            method:
              "DELETE"
          }
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  // EDIT TASK
  const editTask =
    async (
      id,
      oldTask
    ) => {
      const newTask =
        prompt(
          "Edit task:",
          oldTask
        );

      if (!newTask)
        return;

      try {
        await fetch(
          `http://localhost:3001/tasks/${id}`,
          {
            method:
              "PUT",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify({
                task:
                  newTask
              })
          }
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  // COMPLETE TASK
  const completeTask =
    async (id) => {
      try {
        await fetch(
          `http://localhost:3001/tasks/complete/${id}`,
          {
            method:
              "PUT"
          }
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container">
      <h1>
        Task Manager App 🔥
      </h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) =>
            setTask(
              e.target.value
            )
          }
        />

        <button
          className="add-btn"
          onClick={
            addTask
          }
        >
          Add
        </button>
      </div>

      <h2>Tasks</h2>

      {tasks.length ===
      0 ? (
        <p className="empty-message">
          No tasks yet 🔥
        </p>
      ) : (
        tasks.map(
          (item) => (
            <div
              className="task-item"
              key={
                item.id
              }
            >
              <p
                style={{
                  textDecoration:
                    item.completed
                      ? "line-through"
                      : "none",

                  color:
                    item.completed
                      ? "green"
                      : "black"
                }}
              >
                {
                  item.task
                }
              </p>

              <div className="task-buttons">
                <button
                  className="complete-btn"
                  onClick={() =>
                    completeTask(
                      item.id
                    )
                  }
                >
                  {item.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    editTask(
                      item.id,
                      item.task
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(
                      item.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default App;