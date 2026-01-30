import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// GA Measurement ID - 公开跟踪 ID，可安全存放在代码中
const GA_MEASUREMENT_ID = "G-YZ85342GQQ";

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
