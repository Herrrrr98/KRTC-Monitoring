import styles from './StatBox.module.css';
import '../theme.css';

export function StatBox({
  label, value, type
}) {
  const colorClass = styles[type] || '';

  return (
    <div className={`${styles.statBox} ${colorClass}`}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statVal}>{value}</div>
    </div>
  )
}