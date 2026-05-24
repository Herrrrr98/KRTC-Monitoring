import styles from './HeaderDashboard.module.css';
import '../theme.css';

export function HeaderDashboard({
  lastRefreshTime, refreshRate, totalRequest, 
  trainsTotal, trainsInRed, trainsInOrange 
}) {
  return (
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
  )
}