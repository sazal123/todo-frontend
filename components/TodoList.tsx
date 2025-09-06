"use client";

import { useState } from "react";
import { addTodo, updateTodoStatus, deleteTodo } from "../lib/api";

interface Todo {
  id: string;
  title: string;
  status: "PENDING" | "DONE";
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "DONE">("ALL");

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const todo = await addTodo(newTitle);
    setTodos([...todos, todo]);
    setNewTitle("");
  };

  const handleUpdate = async (id: string) => {
    const updated = await updateTodoStatus(id, "DONE");
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos =
    filter === "ALL" ? todos : todos.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Add New Todo */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New To-Do"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {(["ALL", "PENDING", "DONE"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <span
                className={`font-medium ${
                  todo.status === "DONE" ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>
            </div>
            <div className="flex gap-2">
              {todo.status !== "DONE" && (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                >
                  Mark Done
                </button>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {filteredTodos.length === 0 && (
          <li className="text-center text-gray-500 py-4">
            No To-Dos found.
          </li>
        )}
      </ul>
    </div>
  );
}
