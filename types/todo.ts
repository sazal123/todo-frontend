export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "DONE";
  createdAt: string;
  updatedAt: string;
}
