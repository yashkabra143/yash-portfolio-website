import { useEffect, useState } from 'react';

interface PageView {
  path: string;
  referrer: string;
  timestamp: number;
}

/**
 * Simple analytics tracker that logs page views and basic user interactions
 * without sending data to external services
 */
export default function AnalyticsTracker() {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  
  // Track when sections are viewed
  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          logEvent('section_view', { sectionId });
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.3, // Section is considered viewed when 30% is visible
    });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Track page views and navigation
  useEffect(() => {
    // Log initial page view
    logPageView();
    
    // Track navigation within the site (hash changes)
    const handleHashChange = () => {
      logPageView();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Helper function to log page views
  const logPageView = () => {
    const newPageView: PageView = {
      path: window.location.pathname + window.location.hash,
      referrer: document.referrer,
      timestamp: Date.now()
    };
    
    // Store in state
    setPageViews(prev => [...prev, newPageView]);
    
    // For debugging only - remove in production
    console.log('Page view:', newPageView);
    
    // This is where you would normally send analytics data to a server
    // We're keeping it local for privacy
  };
  
  // Helper function to log other events
  const logEvent = (eventName: string, eventData: any) => {
    // For debugging only - remove in production
    console.log('Event:', eventName, eventData);
    
    // This is where you would normally send analytics data to a server
    // We're keeping it local for privacy
  };

  // This component doesn't render anything visible
  return null;
}
