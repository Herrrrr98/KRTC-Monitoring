import styles from './SwitchMachineAnalyze.module.css';
import '../theme.css';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function SwitchMachineDetectorOverivew() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ switchMachineBehavior, setSwitchMachineBehavior] = useState(null);
  const [ isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () => {
        try {
            const result = await window.api.getSwitchMachineBehavior();
            setSwitchMachineBehavior(result?.data || result || []);
            console.log("SwitchMachineBehavior:", result?.data);
        }catch(e){
            console.error("Err when calling window.api:", e)
        }finally{
            setIsLoading(false);
        };
    };
    fetchData();
  }, []);
  
  return (
  <div style={{ 
            padding: '20px', 
            color: 'var(--text-main)', 
            backgroundColor: 'var(--bg-trainLiveBox)',
            minHeight: '100vh',
            boxSizing: 'border-box'
        }}>
            {/* Top Navigation */}
            <button 
                style={{ 
                    backgroundColor: 'var(--bg-btn)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-color)', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                }} 
                onClick={() => navigate('/')}
            >
                Home
            </button>

            <h2 style={{ marginTop: '15px', color: "#a0aec0"}}>
                Detecting Switch Machine Behavior
            </h2>

            
            <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: 'var(--bg-panel, )', 
                borderRadius: '6px', 
                border: '1px solid var(--border-color, #2d2d34)',
                overflowY: 'auto',       
                paddingRight: '10px',
                maxHeight: 'calc(100vh - 180px)', 
                paddingBottom: '40px'
            }}>
                <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)' }}>Behavior Records:</h3>

                {isLoading ? (
                    <h2 style={{ color: '#a0aec0' }}>Loading System Logs...</h2>
                ) : (
                    Array.isArray(switchMachineBehavior) && switchMachineBehavior.length > 0 ? (
                        switchMachineBehavior.map((item, index) => {
                            const [startTime, endTime] = item.Time ? item.Time.split(' --> ') : ['N/A', 'N/A'];
                            const displayClass = typeof item.Class === 'object' && item.Class !== null 
                                ? item.Class.Class 
                                : item.Class;
                            return (
                                <div className={styles.behaviorCard} key={index}>
                                    {/* Card Header Row */}
                                    <div className={styles.cardHeader}>
                                        <span className={styles.dateBadge}>📅 {item.Date}</span>
                                        <span className={styles.classInfo}>
                                            { displayClass === "Could Not get the Class Number due to source file errors" ? <span> <strong> Source File Error </strong>(Possibly due to KRTC failing to set train ID) </span> : <span> Train ID: <strong title={displayClass}>{displayClass}</strong> </span>}
                                        </span>
                                    </div>

                                    {/* Tracks the System Transfer */}
                                    <div className={styles.transferTrack}>
                                        <div className={styles.systemBox}>
                                            <span className={styles.label}>PREV SYSTEM</span>
                                            <span className={(item["Previous System"][0] === "O" ? styles.OsystemValue: styles.RsystemValue)}>{item['Previous System'] || 'N/A'}</span>
                                        </div>

                                        <div className={styles.arrowLine}>
                                            <span className={styles.arrowValue}>SWITCH ACTION</span>
                                            <div className={ (item["Previous System"][0] === "O" ? styles.OtoR_lineIndicator: styles.RtoO_lineIndicator)}></div>
                                        </div>

                                        <div className={styles.systemBox}>
                                            <span className={styles.label}>First Seen System</span>
                                            <span className={(item["Current System"][0] === "O" ? styles.OsystemValue: styles.RsystemValue)}>{item['Current System'] || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Time frames */}
                                    <div className={styles.cardFooter}>
                                        <span> Sequence: <strong>{startTime}</strong> ➔ <strong>{endTime}</strong></span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h3 style={{ color: '#a0aec0', textAlign: 'center' }}>No switch behaviors logged.</h3>
                    )
                )}
            </div>
        </div>
    );
}
