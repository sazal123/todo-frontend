"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoList from "../components/TodoList";
import { getTodos } from "../lib/api";

export default function HomePage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
      return;
    }
    setIsLoggedIn(true);

    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        localStorage.removeItem("token"); // token expired/invalid
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/register");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">To-Do List</h1>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
        <TodoList initialTodos={todos} />
      </div>
    </main>
  );
}
