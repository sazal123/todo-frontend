"use client";

import { useState } from "react";
import { createTodo } from "../services/todoService";

interface Props {
  onAdded: () => void;
}

export default function TodoForm({ onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createTodo(title, description);
    setTitle("");
    setDescription("");
    onAdded();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow rounded-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg transition"
      >
        Add To-Do
      </button>
    </form>
  );
}
