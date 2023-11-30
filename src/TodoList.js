import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const completedState =
      JSON.parse(localStorage.getItem("completedState")) || [];

    return storedTodos.map((todo, index) => ({
      task: todo.task,
      completed: completedState[index] || false,
    }));
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem(
      "completedState",
      JSON.stringify(todos.map((todo) => todo.completed)),
    );
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { task, completed: false }]);
      setTask("");
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <h1>Todo List</h1>
      <p>{`${completedCount} out of ${todos.length} tasks completed`}</p>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button className="action-button" onClick={addTodo}>
        Add Task
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <span>{index + 1}. </span>
            {todo.task}
            <button
              className="action-button"
              onClick={() => toggleCompletion(index)}
            >
              {todo.completed ? "Undo" : "Complete Task"}
            </button>
            <button className="action-button" onClick={() => removeTodo(index)}>
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
