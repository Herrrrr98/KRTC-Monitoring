//This jsx was mostly created by Gemini.
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplayController } from './ReplayController'; 
import { KrtcMapSvg } from './KrtcMapSvg'; 

export default function ReplayDashboard() {
    const navigate = useNavigate();
    const [historicalData, setHistoricalData] = useState([]);
    const [activeTrains, setActiveTrains] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        const loadFolders = async () => {
            try {
                const Folders = await window.api.getDateFolders();
                const folders = Folders.data;
                if (folders && folders.length > 0) {
                    
                    folders.sort((a, b) => {
                        const [yA, mA, dA] = a.split('_').map(Number);
                        const [yB, mB, dB] = b.split('_').map(Number);
                        return new Date(yB, mB - 1, dB) - new Date(yA, mA - 1, dA);
                    });

                    setAvailableDates(folders);
                    setTargetDate(folders[0]);
                }
            } catch (error) {
                console.error("Failed to fetch available date folders:", error);
            }
        };
        loadFolders();
    }, []);

    const { startTime, endTime } = useMemo(() => {
        if (!targetDate) {
            return { startTime: new Date(), endTime: new Date() };
        }
        const [year, month, day] = targetDate.split('_');
        const safeDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; 
        return {
            startTime: new Date(`${safeDateString}T00:00:00`),
            endTime: new Date(`${safeDateString}T23:59:59`)
        };
    }, [targetDate]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!targetDate) return;
            try {
                const data = await window.api.getHistoricalData(targetDate);
                if (data && data.length > 0) {
                    setHistoricalData(data);
                } else {
                    setHistoricalData([]);
                    setActiveTrains([]);
                }
            } catch (error) {
                console.error("Failed to load history for date folder:", targetDate, error);
                setHistoricalData([]);
                setActiveTrains([]);
            }
        };
        fetchHistory();
    }, [targetDate]);

    const handleTimeUpdate = useCallback((currentSimDate) => {
        if (!historicalData || historicalData.length === 0) {
            setActiveTrains([]);
            return;
        }

        const currentPositions = historicalData.map(train => {
            const logsArray = train.logs || train.timeline || [];
            if (logsArray.length === 0) return null;

            const recentLog = [...logsArray].reverse().find(log => {
                if (!log.time) return false;
                
                const [hours, minutes, seconds] = log.time.split(':');
                const logTime = new Date(currentSimDate);
                logTime.setHours(parseInt(hours, 10), parseInt(minutes || 0, 10), parseInt(seconds || 0, 10));
                
                return logTime <= currentSimDate;
            });
            
            if (recentLog) {
                return { trainId: train.TrainID, station: recentLog.station };
            }
            return null;
        }).filter(t => t !== null);

        setActiveTrains(prev => {
            if (JSON.stringify(prev) === JSON.stringify(currentPositions)) return prev;
            return currentPositions;
        });
    }, [historicalData]);

    if (availableDates.length === 0 || !targetDate) {
        return (
            <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#1a202c', color: '#fff' }}>
                <p>Scanning directory for historical date folders...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'var(--bg-panel, )' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <button 
                    style={{ backgroundColor: '#4a5568', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }} 
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
                <h2 style={{ color: '#ecc94b', margin: 0 }}>Historical Map Replay</h2>

                {/* Dynamic Dropdown Selection bound directly to your backend directory strings */}
                <select 
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ecc94b',
                        backgroundColor: '#2d3748',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                >
                    {availableDates.map((dateString) => (
                        <option key={dateString} value={dateString}>
                            {dateString.replace(/_/g, ' / ')}
                        </option>
                    ))}
                </select>
            </div>
            
            <ReplayController 
                startTime={startTime} 
                endTime={endTime} 
                onTimeUpdate={handleTimeUpdate} 
            />

            <div style={{ marginTop: '20px' }}>
                <KrtcMapSvg activeTrains={activeTrains} />
            </div>
        </div>
    );
}