// Simple Analytics Wrapper
// Future integration: PostHog, Umami, or Google Analytics

const isDev = import.meta.env.DEV;

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
       if (isDev) {
              console.log(`[Analytics] ${eventName}`, properties);
              return;
       }

       // TODO: Integrate real analytics SDK here
       // Example for PostHog:
       // posthog.capture(eventName, properties);

       // Example for Window.gtag (if using GA):
       // if (window.gtag) window.gtag('event', eventName, properties);
};

export const AnalyticsEvents = {
       SURVEY_START: 'survey_start',
       SURVEY_COMPLETE: 'survey_complete',
       SHARE_CLICK: 'share_click',
       POKEDEX_OPEN: 'pokedex_open',
       CAMP_SELECTED: 'camp_selected',
       RETEST: 'retest',
};
