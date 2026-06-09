import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplayController } from './ReplayController'; 
import { KrtcMapSvg } from './KrtcMapSvg'; 

export default function ReplayDashboard() {
    const navigate = useNavigate();
    const [historicalData, setHistoricalData] = useState([]);
    const [activeTrains, setActiveTrains] = useState([]);
    
    const targetDate = '2026_5_16';

    // Safely memoize the start/end dates so they never trigger loops
    const { startTime, endTime } = useMemo(() => {
        const [year, month, day] = targetDate.split('_');
        const safeDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; 
        return {
            startTime: new Date(`${safeDateString}T06:00:00`),
            endTime: new Date(`${safeDateString}T23:59:59`)
        };
    }, [targetDate]);

    // Fetch the data exactly once
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await window.api.getHistoricalData(targetDate);
                if (data) setHistoricalData(data);
            } catch (error) {
                console.error("Failed to load history:", error);
            }
        };
        fetchHistory();
    }, [targetDate]);

    // Safely calculate train positions based on the incoming clock tick
    const handleTimeUpdate = useCallback((currentSimDate) => {
        if (!historicalData || historicalData.length === 0) return;

        const currentPositions = historicalData.map(train => {
            const logsArray = train.logs || train.timeline || [];
            if (logsArray.length === 0) return null;

            const recentLog = [...logsArray].reverse().find(log => {
                if (!log.time) return false;
                
                const [hours, minutes, seconds] = log.time.split(':');
                const logTime = new Date(currentSimDate);
                logTime.setHours(parseInt(hours), parseInt(minutes || 0), parseInt(seconds || 0));
                
                return logTime <= currentSimDate;
            });
            
            if (recentLog) {
                return { trainId: train.TrainID, station: recentLog.station };
            }
            return null;
        }).filter(t => t !== null);

        // Anti-Loop Protection: Only update React state if the trains ACTUALLY moved
        setActiveTrains(prev => {
            if (JSON.stringify(prev) === JSON.stringify(currentPositions)) return prev;
            return currentPositions;
        });
    }, [historicalData]);

    return (
        <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#1a202c' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <button 
                    style={{ backgroundColor: '#4a5568', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }} 
                    onClick={() => navigate('/')}
                >
                    ⬅ Home
                </button>
                <h2 style={{ color: '#ecc94b', margin: 0 }}>Historical Map Replay ({targetDate})</h2>
            </div>
            
            <ReplayController 
                startTime={startTime} 
                endTime={endTime} 
                onTimeUpdate={handleTimeUpdate} 
            />

            <div style={{ marginTop: '20px' }}>
                {/* REMEMBER: Your giant SVG code needs to be pasted back inside KrtcMapSvg.jsx! */}
                <KrtcMapSvg activeTrains={activeTrains} />
            </div>
        </div>
    );
}