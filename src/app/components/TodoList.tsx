import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControlLabel,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '@/todos';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onCheckedChange: (id: string, check: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onDeleteTodo, onCheckedChange, todos }) => {
  const [deleteDialogId, setDeleteDialogId] = useState('');

  const handleDelete = (id: string) => {
    onDeleteTodo(id);
    setDeleteDialogId('');
  };

  return (
    <List>
      {todos.map((todo, todoKey) => (
        <ListItem
          key={todoKey}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => setDeleteDialogId(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={event => onCheckedChange(todo.id, event.target.checked)}
                />
              }
              label=""
            />
          </ListItemAvatar>
          <ListItemText primary={todo.content} />
        </ListItem>
      ))}
      <Dialog
        open={!!deleteDialogId}
        onClose={() => setDeleteDialogId('')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete todo?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure you want to delete this todo? this action is irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogId('')}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteDialogId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default TodoList;
