import { useState, useEffect } from 'react';
import styles from './LeftContainer.module.css';
import '../theme.css';
import { HeaderDashboard } from './HeaderDashBoard';
import { TrainLiveBox } from './TrainLiveBox';

export function LeftContainer() {
  const [trainData, setTrainData] = useState([]);
  const [apiMeta, setApiMeta] = useState({
    lest_refresh: "00:00",
    refresh_rate: 30000,
    reqcount: 0,
    rNum: 0,
    oNum: 0
  });

  useEffect(() => {
    const unsubscribe = window.api.onKrtcUpdate((report) => {
      console.log("get krtc info", report);
      if (report && Array.isArray(report.trains)) {
        setTrainData(report.trains);
        setApiMeta({
          lest_refresh: report.lest_refresh || "00:00",
          refresh_rate: report.refresh_rate || 30000,
          reqcount: report.reqcount || 0,
          rNum: report.rNum || 0,
          oNum: report.oNum || 0
        });
      }
    });

    if (window.api && typeof window.api.startMonitor === 'function') {
      window.api.startMonitor();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const sortedTrainData = [...trainData].sort((a, b) => {
    if (a.Line === b.Line) return a.TrainID.localeCompare(b.TrainID); 
    return a.Line === 'R' ? -1 : 1;
  });

  const lastRefreshTime = apiMeta.lest_refresh;
  const refreshRate = String(apiMeta.refresh_rate / 1000);
  const totalRequest = apiMeta.reqcount;
  const trainsInRed = apiMeta.rNum;
  const trainsInOrange = apiMeta.oNum;
  const trainsTotal = trainsInRed + trainsInOrange;

  return (
    <div className={styles.leftContainer}>
      <HeaderDashboard 
        lastRefreshTime={lastRefreshTime}
        refreshRate={refreshRate}
        totalRequest={totalRequest}
        trainsTotal={trainsTotal}
        trainsInRed={trainsInRed}
        trainsInOrange={trainsInOrange}
      />
      <TrainLiveBox trainData={sortedTrainData} />
    </div>
  )
}