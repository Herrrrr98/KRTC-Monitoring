import styles from './LiveCard.module.css'
import '../theme.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export function LiveCard({ train, index }) {
    const navigate = useNavigate();
    const isOrange = train.Line === 'O';
    const colorClass = isOrange ? styles.textOrange : styles.textRed;
    const [isFlashing, setIsFlashing] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        setIsFlashing(true);

        const timer = setTimeout(() => {
            setIsFlashing(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [train.WhereItWas]);

    const handle_click = (id) => {
        navigate('/TripTimeOverview', {
            state: { id }
        });
    };
    
    return (
        <button className={`${styles.liveCard} ${isFlashing ? styles.flashBlue : ''}`} key={train.TrainID || index} onClick={() => handle_click(train.TrainID)}>
            <div className={styles.cardTrainNo}>Train No. {train.TrainID}</div>
            <div className={`${styles.cardStation} ${colorClass}`}>
                {train.WhereItWas}
            </div>
        </button>
    );
}