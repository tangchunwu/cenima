import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const GoogleAnalytics = () => {
       const location = useLocation();

       useEffect(() => {
              // Only initialize if the ID is available
              if (GA_MEASUREMENT_ID) {
                     console.log("Initializing GA with ID:", GA_MEASUREMENT_ID);
                     ReactGA.initialize(GA_MEASUREMENT_ID);
              } else {
                     console.warn("GA_MEASUREMENT_ID is not defined in environment variables");
              }
       }, []);

       useEffect(() => {
              if (GA_MEASUREMENT_ID) {
                     console.log(`[GA] Sending pageview: ${location.pathname}${location.search}`);
                     ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
              }
       }, [location]);

       return null;
};
