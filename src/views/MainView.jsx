import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../theme.css';
import styles from './app.module.css'

export default function MainView() {
  const navigate = useNavigate();

  const [trainData, setTrainData] = useState([
    { no: "26", station: "O13" },
    { no: "39", station: "R7" },
    { no: "42", station: "R18" },
    { no: "40", station: "R22R21" },
    { no: "07", station: "O12" },
    { no: "36", station: "O2" },
    { no: "31", station: "R3" },
    { no: "15", station: "O8O9" },
    { no: "34", station: "O6" },
    { no: "03", station: "R9" },
    { no: "29", station: "R11" },
    { no: "10", station: "R24" },
    { no: "14", station: "R6" },
    { no: "04", station: "R4" },
    { no: "16", station: "OT1" },
    { no: "12", station: "R18R17" },
    { no: "27", station: "R15" },
    { no: "38", station: "R14R13" },
    { no: "32", station: "R22R22A" },
    { no: "19", station: "O1" },
    { no: "33", station: "RK1R24" }
  ]);


  const lastRefreshTime = "20:46";
  const refreshRate = "30";
  const totalRequest = 1;
  const trainsTotal = 21;
  const trainsInRed = 14;
  const trainsInOrange = 7;

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
              {trainData.map((train, index) => {
                const isOrange = train.station.startsWith('O');
                const colorClass = isOrange ? styles.textOrange : styles.textRed;
                return (
                  <div className={styles.liveCard} key={train.no || index}>
                    <div className={styles.cardTrainNo}>Train No. {train.no}</div>
                    <div className={`${styles.cardStation} ${colorClass}`}>
                      {train.station}
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
