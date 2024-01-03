import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendAnalyticsEvent } from '.';

export const usePageViewed = () => {
  const [fired, setFired] = useState(false);
  const [pageViewId, setPageViewId] = useState('');

  useEffect(() => {
    if (!fired) {
      const id = uuidv4();
      setPageViewId(id);
      sendAnalyticsEvent({ type: 'page_viewed', id });
      setFired(true);
    }
  }, [fired]);

  return { pageViewId };
};
