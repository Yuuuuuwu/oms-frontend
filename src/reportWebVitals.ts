// src/reportWebVitals.ts
import { ReportHandler } from "web-vitals";

/**
 * 報告 Web Vitals 指標
 * @param onPerfEntry - callback function for performance entries
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((err) => {
        console.error("Web Vitals 報告載入失敗：", err);
      });
  }
};

export default reportWebVitals;
