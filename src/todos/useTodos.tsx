import { sendAnalyticsEvent } from '@/analytics';
import { useEffect, useState } from 'react';
import { Todo, addTodo, deleteTodo, getTodos, updateTodo } from '.';

export const useTodos = (pageViewId: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      if (response) {
        setTodos(response);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const onCheckedChange = async (id: string, check: boolean) => {
    try {
      setLoading(true);
      const response = await updateTodo(id, {
        completed: check,
      });
      if (response) {
        sendAnalyticsEvent({
          type: 'todo_interacted',
          id,
          pageViewId,
          action: check ? 'completed' : 'uncompleted',
        });
        await refreshTodos();
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const onDeleteTodo = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteTodo(id);
      if (response) {
        sendAnalyticsEvent({
          type: 'todo_interacted',
          id,
          pageViewId,
          action: 'deleted',
        });
        await refreshTodos();
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const onAddTodo = async (values: Partial<Todo>) => {
    try {
      setLoading(true);
      const response = await addTodo(values);
      if (response) {
        sendAnalyticsEvent({
          type: 'todo_interacted',
          id: response.id,
          pageViewId,
          action: 'created',
        });
        await refreshTodos();
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return {
    onCheckedChange,
    onDeleteTodo,
    onAddTodo,
    todos,
    loading,
  };
};
