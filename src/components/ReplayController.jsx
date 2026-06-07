import React, { useState, useEffect } from 'react';

export function ReplayController({ onTimeUpdate, startTime, endTime }) {
    const startMs = startTime.getTime();
    const endMs = endTime.getTime();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTimeMs, setCurrentTimeMs] = useState(startMs);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); 

    // Sync if parent changes the start date
    useEffect(() => {
        setCurrentTimeMs(startMs);
        setIsPlaying(false);
    }, [startMs]);

    // 1. The Clock Engine
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTimeMs(prev => {
                    const nextMs = prev + (1000 * playbackSpeed);
                    if (nextMs >= endMs) {
                        setIsPlaying(false);
                        return endMs;
                    }
                    return nextMs;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, endMs]);

    // ✨ THE FIX: Safe transmission to parent!
    // This strictly runs AFTER the component renders, keeping React happy.
    useEffect(() => {
        onTimeUpdate(new Date(currentTimeMs));
    }, [currentTimeMs, onTimeUpdate]);

    const handlePlayToggle = () => {
        if (!isPlaying && currentTimeMs >= endMs) {
            setCurrentTimeMs(startMs);
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (ms) => new Date(ms).toLocaleTimeString('en-US', { hour12: false });

    return (
        <div style={{ background: '#2d3748', padding: '15px', borderRadius: '8px', color: 'white', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
                onClick={handlePlayToggle}
                style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#4a5568', color: 'white' }}
            >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            
            <span style={{ fontWeight: 'bold', minWidth: '80px' }}>{formatTime(currentTimeMs)}</span>

            <input 
                type="range" 
                min={startMs} 
                max={endMs} 
                value={currentTimeMs} 
                onChange={(e) => setCurrentTimeMs(Number(e.target.value))}
                style={{ flexGrow: 1, cursor: 'pointer' }}
            />

            <select 
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                style={{ padding: '6px', borderRadius: '4px' }}
            >
                <option value={1}>1x Speed</option>
                <option value={5}>5x Speed</option>
                <option value={30}>30x Speed (1 min/sec)</option>
                <option value={300}>300x Speed (5 mins/sec)</option>
            </select>
        </div>
    );
}