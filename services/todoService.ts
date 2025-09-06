import api from "../lib/api";
import { Todo } from "../types/todo";

export async function fetchTodos(status?: string): Promise<Todo[]> {
  const res = await api.get<Todo[]>("/todos", { params: { status } });
  return res.data;
}

export async function createTodo(title: string, description?: string): Promise<Todo> {
  const res = await api.post<Todo>("/todos", { title, description });
  return res.data;
}

export async function updateTodoStatus(id: string): Promise<Todo> {
  const res = await api.put<Todo>(`/todos/${id}`, { status: "DONE" });
  return res.data;
}

export async function deleteTodo(id: string): Promise<void> {
  await api.delete(`/todos/${id}`);
}
