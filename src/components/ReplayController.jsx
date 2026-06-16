//This jsx was mostly created by Gemini.
import React, { useState, useEffect } from 'react';
import config from '../../config.json'
const fetching_data_period = config.timeouts.main_app / 1000;
const timeout_between_rendering_trains = config.timeouts.timeout_between_rendering_trains;

export function ReplayController({ onTimeUpdate, startTime, endTime }) {
    const startMs = startTime.getTime();
    const endMs = endTime.getTime();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTimeMs, setCurrentTimeMs] = useState(startMs);
    const [playbackSpeed, setPlaybackSpeed] = useState(fetching_data_period); 

    useEffect(() => {
        setCurrentTimeMs(startMs);
        setIsPlaying(false);
    }, [startMs]);

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
            }, timeout_between_rendering_trains);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, endMs]);

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
        <div style={{ background: 'var(--bg-btn)', padding: '15px', borderRadius: '8px', color: 'white', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
                onClick={handlePlayToggle}
                style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#232323', color: 'white' }}
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
                <option value={fetching_data_period}>As the program updates</option>
                <option value={1}>1x Speed</option>
                <option value={5}>5x Speed</option>
                <option value={30}>30x Speed (1 min/sec)</option>
                <option value={300}>300x Speed (5 mins/sec)</option>
            </select>
        </div>
    );
}