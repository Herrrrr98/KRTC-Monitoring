import React, { useState, useEffect } from 'react';
import '../theme.css';
import styles from './app.module.css'

export default function MainView() {
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
        </div>
      </div>
    </>
  )
}
