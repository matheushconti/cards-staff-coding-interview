export type AnalyticsEvent = {
  type: 'page_viewed' | 'todo_interacted';
  id: string;
  pageViewId?: string;
  action?: 'completed' | 'uncompleted' | 'created' | 'deleted';
};

export const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
  const response = await fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'content-type': 'application/json',
    },
  });

  return response.json();
};
