import styles from './LiveCard.module.css'
import '../theme.css';
import { useNavigate } from 'react-router-dom';

export function LiveCard({ train, index }) {
    const navigate = useNavigate();
    const isOrange = train.Line === 'O';
    const colorClass = isOrange ? styles.textOrange : styles.textRed;

    const handle_click = (id) => {
        navigate('/page', {
            state: { id }
        });
    };
    
    return (
        <button className={styles.liveCard} key={train.TrainID || index} onClick={() => handle_click(train.TrainID)}>
            <div className={styles.cardTrainNo}>Train No. {train.TrainID}</div>
            <div className={`${styles.cardStation} ${colorClass}`}>
                {train.WhereItWas}
            </div>
        </button>
    );
}