"use client";

import axios from "axios";

const BASE_URL = "http://localhost:3000"; // NestJS backend API

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token from localStorage automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- API Functions ----------

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  const token = res.data.access_token;
  localStorage.setItem("token", token);
  return res.data;
}

export async function getTodos() {
  const res = await api.get("/todos");
  return res.data;
}

export async function addTodo(title: string) {
  const res = await api.post("/todos", { title });
  return res.data;
}

export async function updateTodoStatus(id: string, status: string) {
  const res = await api.put(`/todos/${id}`, { status });
  return res.data;
}

export async function deleteTodo(id: string) {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
}
