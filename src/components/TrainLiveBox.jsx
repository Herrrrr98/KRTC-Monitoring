import styles from './TrainLiveBox.module.css';
import '../theme.css';
import { LiveCard } from './LiveCard';

export function TrainLiveBox({ trainData }) {
  return (
    <div className={styles.trainLiveBox}>
      <div className={styles.liveboxContainer}>
        {trainData.map((train, index) => {
          return <LiveCard train={train} index={index} />;
        })}
      </div>
    </div>
  );
}