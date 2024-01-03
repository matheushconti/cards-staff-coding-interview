import { z } from 'zod';

const PageViewedEventSchema = z.object({
  type: z.literal('page_viewed'),
  id: z.string(),
});

const TodoInteractedEventSchema = z.object({
  type: z.literal('todo_interacted'),
  id: z.string(),
  pageViewId: z.string(),
  action: z.enum(['completed', 'uncompleted', 'created', 'deleted']),
});

const AnalyticsEventSchema = z.discriminatedUnion('type', [
  PageViewedEventSchema,
  TodoInteractedEventSchema,
]);

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = AnalyticsEventSchema.parse(body);

    return new Response(
      JSON.stringify({
        message: 'received',
        payload: response,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(errorMessage, {
      status: 400,
    });
  }
}
