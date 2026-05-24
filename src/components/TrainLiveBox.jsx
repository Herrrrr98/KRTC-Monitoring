import styles from './TrainLiveBox.module.css';
import '../theme.css';

export function TrainLiveBox({ trainData }) {
  return (
    <div className={styles.trainLiveBox}>
      <div className={styles.liveboxContainer}>
        {trainData.map((train, index) => {
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
  );
}