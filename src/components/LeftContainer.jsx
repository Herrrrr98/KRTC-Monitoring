import { useState, useEffect } from 'react';
import styles from './leftContainer.module.css';
import '../theme.css';

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
      <div className={styles.headerDashboard}>
        <div className={styles.metaRow}>
            <span>last refresh: {lastRefreshTime}</span>
            <span>refresh rate: {refreshRate} sec</span>
            <span>total request: {totalRequest}</span>
        </div>
        <div className={styles.statsGrid}>
          <div className={`${styles.statBox} ${styles.green}`}>
            <div className={styles.statLabel}>Trains Online</div>
            <div className={styles.statVal}>{trainsTotal} in total</div>
          </div>
          <div className={`${styles.statBox} ${styles.red}`}>
            <div className={styles.statLabel}>Red Line (WorkLoad)</div>
            <div className={styles.statVal}>{trainsInRed}/28 ({((trainsInRed / 28) * 100).toFixed(1)}%)</div>
          </div>
          <div className={`${styles.statBox} ${styles.orange}`}>
            <div className={styles.statLabel}>Orange Line (WorkLoad)</div>
            <div className={styles.statVal}>{trainsInOrange}/14 ({((trainsInOrange / 14) * 100).toFixed(1)}%)</div>
          </div>
        </div>
      </div>
      <div className={styles.trainLiveBox}>
        <div className={styles.liveboxContainer}>
          {sortedTrainData.map((train, index) => {
            const isOrange = train.Line === 'O';
            const colorClass = isOrange ? styles.textOrange : styles.textRed;
            return (
              <div className={styles.liveCard} key={train.TrainID || index}>
                <div className={styles.cardTrainNo}>Train No. {train.TrainID}</div>
                <div className={`${styles.cardStation} ${colorClass}`}>
                  {train.WhereItWas}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}