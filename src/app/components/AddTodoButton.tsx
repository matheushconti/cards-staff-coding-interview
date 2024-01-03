import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Todo } from '@/todos';

interface AddTodoButtonProps {
  onAddTodo: (values: Partial<Todo>) => void;
}
const validationSchema = yup.object().shape({
  content: yup.string().required('This field is required.'),
});
const initialValues: Pick<Todo, 'content'> = {
  content: '',
};

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onAddTodo }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = async (values: Partial<Todo>) => {
    onAddTodo(values);
    setOpenDialog(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add Todo
      </Button>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isValid }) => (
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle id="alert-dialog-title">Add new TODO</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  id="outlined-basic"
                  label="Content"
                  variant="filled"
                  name="content"
                  fullWidth
                  onChange={handleChange('content')}
                  onBlur={handleBlur('content')}
                  helperText={errors.content}
                  error={touched.content ? !!errors.content : false}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default AddTodoButton;
