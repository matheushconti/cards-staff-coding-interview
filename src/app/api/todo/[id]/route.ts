import { Todo } from '@/todos';

const mockTodo = {
  id: 'string',
  content: 'string',
  completed: false,
  createdAt: 2014122222,
};

export async function PATCH(request: Request) {
  const id = request.url.split('/').pop();
  const body = await request.json();

  try {
    const response: Todo[] = [{ ...mockTodo, ...body }];

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(errorMessage, {
      status: 400,
    });
  }
}

export async function DELETE(request: Request) {
  const id = request.url.split('/').pop();

  try {
    const response: Todo[] = [mockTodo].filter(t => t.id !== id);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(errorMessage, {
      status: 400,
    });
  }
}
