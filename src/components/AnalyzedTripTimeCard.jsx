import styles from './AnalyzedTripTimeCard.module.css'
import '../theme.css';
import { useNavigate } from 'react-router-dom';

export function AnalyzedTripTimeCard({ AnalyzedData , index }) {
    const navigate = useNavigate();
    const isOrange = AnalyzedData.System?.Line === 'O';
    const lineBadgeClass = isOrange ? styles.lineOrange : styles.lineRed;

    return (
        <div className={styles.cardContainer} key={index}>
            {/* Top row: Date and Train Class ID */}
            <div className={styles.cardHeader}>
                <span className={styles.dateText}>📅 {AnalyzedData.Date}</span>
                <span className={(isOrange? styles.OclassText : styles.RclassText)}>Train Class: <strong>{AnalyzedData.Class?.Class}</strong></span>
            </div>

            {/*  Transit Route Info */}
            <div className={styles.routeBody}>
                <div className={styles.lineRoute}>
                    <span className={`${styles.badge} ${lineBadgeClass}`}>
                        {AnalyzedData.System?.Line || 'N/A'} Line
                    </span>
                    <span className={styles.headingText}>
                        ➔ {AnalyzedData.System?.heading}
                    </span>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.timeTimeline}>
                <div className={styles.timeBlock}>
                    <span className={styles.timeLabel}>Depart</span>
                    <span className={styles.timeValue}>{AnalyzedData.TripStartTime}</span>
                </div>
                
                <div className={styles.durationBlock}>
                    <span className={styles.durationLine}></span>
                    <span className={styles.durationValue}>{AnalyzedData.TripTime}</span>
                </div>

                <div className={styles.timeBlock}>
                    <span className={styles.timeLabel}>Arrive</span>
                    <span className={styles.timeValue}>{AnalyzedData.TripEndTime}</span>
                </div>
            </div>
        </div>
    );
}