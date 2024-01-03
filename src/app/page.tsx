'use client';
import { CircularProgress, Container, Typography } from '@mui/material';
import TodoList from './components/TodoList';
import { usePageViewed } from '@/analytics/usePageViewed';
import AddTodoButton from './components/AddTodoButton';
import { useTodos } from '@/todos/useTodos';

export default function Home() {
  const { pageViewId } = usePageViewed();
  const { onCheckedChange, onDeleteTodo, onAddTodo, todos, loading } = useTodos(pageViewId);

  return (
    <Container>
      <Typography variant="h1">Todo List</Typography>
      <AddTodoButton onAddTodo={onAddTodo} />
      {loading ? (
        <CircularProgress />
      ) : (
        <TodoList todos={todos} onCheckedChange={onCheckedChange} onDeleteTodo={onDeleteTodo} />
      )}
    </Container>
  );
}
