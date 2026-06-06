import styles from './HeaderDashboard.module.css';
import '../theme.css';
import { StatBox } from './StatBox'; 

export function HeaderDashboard({
  lastRefreshTime, refreshRate, totalRequest, 
  trainsTotal, trainsInRed, trainsInOrange 
}) {
  return (
    <div className={styles.headerDashboard}>
      <div className={styles.metaRow}>
          <span>Last Refresh: {lastRefreshTime}</span>
          <span>Refresh Rate: {refreshRate} sec</span>
          <span>Total Request: {totalRequest}</span>
      </div>
      <div className={styles.statsGrid}>
        <StatBox label="Trains Online" value={`${trainsTotal} in total`} type="green" />
        <StatBox label="Red Line (WorkLoad)" 
          value={`${trainsInRed}/28 (${((trainsInRed / 28) * 100).toFixed(1)}%)`} 
          type="red" 
        />
        <StatBox label="Orange Line (WorkLoad)" 
          value={`${trainsInOrange}/14 (${((trainsInOrange / 14) * 100).toFixed(1)}%)`} 
          type="orange" 
        />
      </div>
    </div>
  )
}