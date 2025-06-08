export type Todo = {
  id?: number,
  name: string,
  completed: boolean,
  userId: number,
  createdDate?: string
}

export type TodosList = {
  limit: number;
  skip: number;
  todos: Todo[];
  total: number
}
