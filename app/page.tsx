"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "First Example", completed: false },
    { id: 2, text: "Second Example", completed: true },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // CREATE
  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };

      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  // UPDATE - TACHAR
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // EMPEZAR EDICIÓN
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // UPDATE - EDITAR TEXTO
  const saveEdit = (id: number) => {
    if (editingText.trim() === "") {
      setEditingId(null);
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editingText.trim() }
          : todo
      )
    );

    setEditingId(null);
  };

  // DELETE
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="container">
      <div className="todo-card">
        <h1>Mis Tareas</h1>

        <p className="subtitle">
          Agrega, edita, tacha y elimina tus tareas.
        </p>

        <input
          className="new-todo"
          type="text"
          placeholder="Escribe una tarea y presiona Enter..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={addTodo}
        />

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty">No hay tareas.</p>
          ) : (
            todos.map((todo) => (
              <div className="todo-item" key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                {editingId === todo.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editingText}
                    autoFocus
                    onChange={(e) =>
                      setEditingText(e.target.value)
                    }
                    onBlur={() => saveEdit(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(todo.id);
                      }
                    }}
                  />
                ) : (
                  <span
                    className={
                      todo.completed
                        ? "todo-text completed"
                        : "todo-text"
                    }
                    onClick={() => startEditing(todo)}
                  >
                    {todo.text}
                  </span>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          <span>Total: {todos.length}</span>

          <span>
            Completadas:{" "}
            {todos.filter((todo) => todo.completed).length}
          </span>
        </div>
      </div>
    </main>
  );
}