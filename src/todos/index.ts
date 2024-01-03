// we could use config to store this on an .env variable
const API_URL = 'https://63ca19f3d0ab64be2b4c5a64.mockapi.io/api/v1';
// const API_URL = '/api';

export interface Todo {
  id: string; // auto increment id
  content: string; // the body of the todo
  completed: boolean; // if the todo is completed
  createdAt: number; // unix timestamp
}

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    return [];
  }
};

export const addTodo = async (values: Partial<Todo>): Promise<Todo | undefined> => {
  try {
    const response = await fetch(`${API_URL}/todo`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    return;
  }
};

export const updateTodo = async (
  id: string,
  values: Partial<Todo>,
): Promise<Todo[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    });
    const payload = await response.json();
    return payload;
  } catch (e) {
    return;
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    await fetch(`${API_URL}/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
