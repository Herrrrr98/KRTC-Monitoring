import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../theme.css';
import styles from './app.module.css'

export default function MainView() {
  const navigate = useNavigate();
 
  useEffect(() => {
    const unsubscribe = window.api.onKrtcUpdate((report) => {
        console.log("get ketc info", report);
    });

    return () => {
        unsubscribe();
    };
  }, []);

  const [trainData, setTrainData] = useState([
    { TrainID: '08', Line: 'R', WhereItWas: 'R8' },
    { TrainID: '26', Line: 'R', WhereItWas: 'R5' },
    { TrainID: '25', Line: 'O', WhereItWas: 'O6' },
    { TrainID: '27', Line: 'R', WhereItWas: 'R14' },
    { TrainID: '39', Line: 'R', WhereItWas: 'R4' },
    { TrainID: '42', Line: 'R', WhereItWas: 'R17' },
    { TrainID: '22', Line: 'R', WhereItWas: 'R24' },
    { TrainID: '13', Line: 'R', WhereItWas: 'R8' },
    { TrainID: '07', Line: 'O', WhereItWas: 'OT1' },
    { TrainID: '40', Line: 'R', WhereItWas: 'R19R20' },
    { TrainID: '41', Line: 'R', WhereItWas: 'R3R4' },
    { TrainID: '01', Line: 'R', WhereItWas: 'R12' },
    { TrainID: '37', Line: 'O', WhereItWas: 'O13' },
    { TrainID: '28', Line: 'R', WhereItWas: 'R16' },
    { TrainID: '35', Line: 'R', WhereItWas: 'R22A' },
    { TrainID: '19', Line: 'O', WhereItWas: 'O1O2' },
    { TrainID: '24', Line: 'O', WhereItWas: 'O4' },
    { TrainID: '10', Line: 'R', WhereItWas: 'R23' },
    { TrainID: '32', Line: 'R', WhereItWas: 'R15' },
    { TrainID: '03', Line: 'R', WhereItWas: 'R20' },
    { TrainID: '09', Line: 'R', WhereItWas: 'R24RK1' },
    { TrainID: '02', Line: 'R', WhereItWas: 'R6' },
    { TrainID: '16', Line: 'O', WhereItWas: 'O11' },
    { TrainID: '06', Line: 'R', WhereItWas: 'R11' },
    { TrainID: '34', Line: 'O', WhereItWas: 'O9O8' },
    { TrainID: '14', Line: 'R', WhereItWas: 'R21' }
  ]);

  const sortedTrainData = [...trainData].sort((a, b) => {
    if (a.Line === b.Line) return a.TrainID.localeCompare(b.TrainID); 
    return a.Line === 'R' ? -1 : 1;
  });



  const lastRefreshTime = "20:46";
  const refreshRate = "30";
  const totalRequest = 1;
  const trainsInRed = 14;
  const trainsInOrange = 7;
  const trainsTotal = trainsInRed + trainsInOrange;

  return (
    <>
      <div className={styles.body}>
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
                <div className={styles.statVal}>{trainsInRed}/28 ({(trainsInRed / 28) * 100}%)</div>
              </div>
              <div className={`${styles.statBox} ${styles.orange}`}>
                <div className={styles.statLabel}>Orange Line (WorkLoad)</div>
                <div className={styles.statVal}>{trainsInOrange}/14 ({(trainsInOrange / 14) * 100}%)</div>
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
        <div className={styles.rightNavBox}>
          <button className={styles.navTPBtn} onClick={() => navigate('/path')}>頁面名稱...</button>
          <button className={styles.navTPBtn} onClick={() => navigate('/path')}>頁面名稱...</button>
          <button className={styles.navTPBtn} onClick={() => navigate('/path')}>頁面名稱...</button>
        </div>
      </div>
    </>
  )
}
