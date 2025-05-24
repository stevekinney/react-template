const API_BASE = '/api';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const api = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  // Create a new todo
  createTodo: async (text: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  // Update a todo
  updateTodo: async (
    id: number,
    updates: Partial<Omit<Todo, 'id'>>,
  ): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  },
};
