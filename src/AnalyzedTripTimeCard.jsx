import styles from './components/LiveCard.module.css'
import './theme.css';
import { useNavigate } from 'react-router-dom';

export function AnalyzedTripTimeCard({ AnalyzedData , index }) {
    const navigate = useNavigate();
    const isOrange = AnalyzedData.System.Line === 'O';
    const colorClass = isOrange ? styles.textOrange : styles.textRed;

    return (
        <div className={styles.liveCard} key={index}>
            <div className={styles.cardTrainNo}>Train Class: {AnalyzedData.Class.Class}</div>
            <div className={`${styles.cardStation} ${colorClass}`}>
             {AnalyzedData.TripTime}
            </div>
        </div>
    );
}

//AnalyzedData = AnalyzeTripTime(specificID) (Mapped)
//eg. 
// AnalyzedData =
// {
//   "alive": true,
//   "data": [
//     {
//       "Date": "2026_5_28",
//       "Class": {
//         "id": 2,
//         "Class": "1103/2103/1104"
//       },
//       "System": {
//         "Line": "R",
//         "forward": "d",
//         "heading": "Siaogang"
//       },
//       "TripStartTime": "6:33",
//       "TripEndTime": "7:23",
//       "TripTime": "50 Minutes"
//     },
//   ]
// }
//
// Linking to TripTimeOverview(preivous Pageview) was not succeddful.
//
//Lines were put in TripTimeOverview 51:12
            // {analyzedData.map((Data, index) => {
            //           return <AnalyzedTripTimeCard key={index} AnalyzedData={Data} index={index} />;
            // })}
//
        
