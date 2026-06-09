import React, { useMemo } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- 1. BUILD THE CUSTOM MAP DATA ---
const R_STATIONS = ["rk1", "r24", "r23", "r22a", "r22", "r21", "r20", "r19", "r18", "r17", "r16", "r15", "r14", "r13", "r12", "r11", "r10", "r9", "r8", "r7", "r6", "r5", "r4a", "r4", "r3"];
// Note: O3 does not exist in KRTC
const O_STATIONS = ["o1", "o2", "o4", "o5", "o6", "o7", "o8", "o9", "o10", "o11", "o12", "o13", "o14", "ot1"]; 

const CENTER_X = 500;
const CENTER_Y = 500;
const SPACING = 28; // Distance between stations in pixels

// Pre-calculate exact geometric coordinates for every station
const buildStationRegistry = () => {
    const registry = {};
    
    // R10 is the 16th item (index 16). Calculate vertical offsets relative to Center Y
    R_STATIONS.forEach((station, index) => {
        const offsetFromCenter = index - 16; 
        registry[station] = {
            x: CENTER_X,
            y: CENTER_Y + (offsetFromCenter * SPACING),
            line: 'R',
            label: station.toUpperCase()
        };
    });

    // O5 is the 4th item (index 3). Calculate horizontal offsets relative to Center X
    // We use a wider spacing (40) for the Orange line so it stretches nicely
    O_STATIONS.forEach((station, index) => {
        const offsetFromCenter = index - 3;
        registry[station] = {
            x: CENTER_X + (offsetFromCenter * 40),
            y: CENTER_Y,
            line: 'O',
            label: station.toUpperCase()
        };
    });

    // Merge intersecting station names (Formosa Boulevard)
    registry['r10'].label = 'R10/O5';
    registry['o5'].label = 'O5/R10';

    return registry;
};

const stationRegistry = buildStationRegistry();

export function KrtcMapSvg({ activeTrains }) {
    
    // --- 2. TRAIN PLACEMENT ENGINE ---
    const trainsToRender = useMemo(() => {
        return activeTrains.map(train => {
            if (!train.station) return null;

            const [stationRaw, forwardDir] = train.station.split("_");
            const cleanStation = (stationRaw || "").toLowerCase().trim();
            const normalizedStation = cleanStation.replace(/^([a-z]+)0+(\d+)/, '$1$2');

            // Find the station in our custom math grid
            const targetStation = stationRegistry[cleanStation] || stationRegistry[normalizedStation];
            if (!targetStation) return null;

            let drawX = targetStation.x;
            let drawY = targetStation.y;

            // ✨ CUSTOM OFFSET LOGIC BASED ON YOUR RULES
            if (targetStation.line === 'R') {
                // Red Line: Right = u (Upstream), Left = d (Downstream)
                if (forwardDir === 'u') drawX += 30;
                else if (forwardDir === 'd') drawX -= 30;
            } else if (targetStation.line === 'O') {
                // Orange Line: Bottom = u (Upstream), Upper = d (Downstream)
                if (forwardDir === 'u') drawY += 28;
                else if (forwardDir === 'd') drawY -= 28;
            }

            return {
                ...train,
                x: drawX,
                y: drawY,
                line: targetStation.line,
                dir: forwardDir
            };
        }).filter(t => t !== null);
    }, [activeTrains]);

    return (
        <div style={{ 
            width: '100%', 
            height: '750px', 
            backgroundColor: '#1E2227', // Clean dark theme background
            borderRadius: '12px',
            border: '1px solid #444',
            overflow: 'hidden' 
        }}>
            <TransformWrapper
                initialScale={1.2}
                minScale={0.5}
                maxScale={5}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <svg viewBox="100 0 900 1000" style={{ width: '100%', height: '100%' }}>
                        
                        {/* --- 3. DRAW THE BASE TRACK LINES --- */}
                        {/* Red Line Vertical Track */}
                        <line 
                            x1={CENTER_X} y1={stationRegistry['rk1'].y - 20} 
                            x2={CENTER_X} y2={stationRegistry['r3'].y + 20} 
                            stroke="#E3002C" strokeWidth="8" strokeLinecap="round" 
                        />
                        
                        {/* Orange Line Horizontal Track */}
                        <line 
                            x1={stationRegistry['o1'].x - 20} y1={CENTER_Y} 
                            x2={stationRegistry['ot1'].x + 20} y2={CENTER_Y} 
                            stroke="#F6A800" strokeWidth="8" strokeLinecap="round" 
                        />

                        {/* --- 4. DRAW THE STATIONS --- */}
                        {Object.values(stationRegistry).map((station, i) => (
                            <g key={`station-${i}`}>
                                {/* Station Dot */}
                                <circle 
                                    cx={station.x} cy={station.y} r="6" 
                                    fill="#FFFFFF" stroke="#333" strokeWidth="2" 
                                />
                                {/* Station Name Text */}
                                <text 
                                    x={station.x + (station.line === 'R' ? 12 : 0)} 
                                    y={station.y + (station.line === 'O' ? -12 : 4)} 
                                    fill="#AAAAAA" fontSize="10px" fontWeight="bold"
                                    textAnchor={station.line === 'O' ? "middle" : "start"}
                                >
                                    {station.label}
                                </text>
                            </g>
                        ))}

                        {/* --- 5. DRAW THE ACTIVE TRAINS --- */}
                        {trainsToRender.map((train, i) => {
                            // Swap images based on direction
                            let imgSrc = '';
                            if (train.line === 'R') {
                                imgSrc = train.dir === 'u' ? '/mrt_R.png' : '/mrt_R2.png';
                            } else if (train.line === 'O') {
                                imgSrc = train.dir === 'u' ? '/mrt_O.png' : '/mrt_O2.png';
                            }

                            return (
                                <g key={`train-${i}`} className="replay-train-marker" style={{ transition: 'all 0.5s ease-in-out' }}>
                                    {/* Track Connector (Draws a faint line linking the train to its station) */}
                                    <line 
                                        x1={train.x} y1={train.y} 
                                        x2={train.line === 'R' ? CENTER_X : train.x} 
                                        y2={train.line === 'O' ? CENTER_Y : train.y} 
                                        stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"
                                    />
                                    
                                    {/* Official KRTC Train Image */}
                                    <image 
                                        href={imgSrc} 
                                        x={train.x - 25} 
                                        y={train.y - 12.5} 
                                        width="50" 
                                        height="25" 
                                    />

                                    {/* Train ID Tag */}
                                    <text 
                                        x={train.x} 
                                        y={train.y - 15} 
                                        fill="#FFFFFF" 
                                        fontSize="12px" 
                                        fontWeight="bold" 
                                        textAnchor="middle"
                                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,1)" }}
                                    >
                                        {train.trainId}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}