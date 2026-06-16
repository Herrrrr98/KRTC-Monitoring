import React, { useMemo } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TrData from '../../backend/KRTC-TrData.json';
import imgR from '../images/mrt_R.png';
import imgO_d from '../images/mrt_O.png';
import imgO_u from '../images/mrt_O2.png';

const R_STATIONS = TrData.lines.R;
const O_STATIONS = TrData.lines.O;

const buildStationRegistry = () => {
    const registry = {};

    R_STATIONS.map((station, index) => {
        const offsetFromCenter = index - 16; 
        registry[station] = {
            x: 500,
            y: 500 + (offsetFromCenter * 100),
            line: 'R',
            label: station.toUpperCase()
        };
    });

    O_STATIONS.map((station, index) => {
        const offsetFromCenter = index - 3;
        registry[station] = {
            x: 500 + (offsetFromCenter * 100),
            y: 500,
            line: 'O',
            label: station.toUpperCase()
        };
    });

    registry['r10'].label = 'R10/O5';
    registry['o5'].label = 'O5/R10';

    return registry;
};

const stationRegistry = buildStationRegistry();

export function KrtcMapSvg({ activeTrains }) {
    const trainsToRender = useMemo(() => {
        return activeTrains.map(train => {
            let stationRaw = train.station || "";
            let forwardDir = train.dir || train.Forwarding || "";

            if (stationRaw.includes('_')) {
                const parts = stationRaw.split('_');
                stationRaw = parts[0];
                forwardDir = parts[1];
            }

            const cleanStation = stationRaw.toLowerCase().trim();
            const normalizedStation = cleanStation.replace(/^([a-z]+)0+(\d+)/, '$1$2');
            const targetStation = stationRegistry[cleanStation] || stationRegistry[normalizedStation];
            if (!targetStation) return null;

            let drawX = targetStation.x;
            let drawY = targetStation.y;
            let angle = 0; 
            let textTransform = '';

            const dirStr = String(forwardDir).toLowerCase();
            const isUpstream = ['u', '0'].includes(dirStr);

            let imgSrc = '';

            if (targetStation.line === 'R') {
                if (isUpstream) {
                    drawX += 20; 
                    imgSrc = imgR;
                    angle = 90;
                    textTransform = "translate(18, 0) rotate(90)";
                } else {
                    drawX -= 20; 
                    imgSrc = imgR;
                    angle = 270;
                    textTransform = "translate(-18, 0) rotate(270)";
                }
            } else if (targetStation.line === 'O') {
                if (isUpstream) {
                    drawY += stationRaw === "O5" ? 55 : 20; 
                    imgSrc = imgO_u;
                    angle = 0;
                    textTransform = "translate(0, 18) rotate(0)";
                } else {
                    drawY -= stationRaw === "O5" ? 55 : 20; 
                    imgSrc = imgO_d;
                    angle = 0;
                    textTransform = "translate(0, -18) rotate(0)";
                }
            }

            return {
                ...train,
                x: drawX,
                y: drawY,
                line: targetStation.line,
                angle: angle,
                imgSrc: imgSrc,
                textTransform: textTransform
            };
        }).filter(t => t !== null);
    }, [activeTrains]);

    return (
        <div style={{ 
            width: '100%', 
            height: '750px', 
            backgroundColor: '#171a1d', 
            borderRadius: '12px',
            border: '1px solid #444',
            overflow: 'hidden' 
        }}>
            <TransformWrapper
                initialScale={5.5}
                minScale={1.8}
                maxScale={10}
                centerOnInit={true}
                limitToBounds={false}
                wheel={{ step: 0.01 }}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <svg viewBox="-700 -1300 2400 3600" style={{ width: '100%', height: '100%' }}>
                        
                        {/* --- DRAW THE BASE TRACK LINES --- */}
                        <line 
                            x1={500} y1={stationRegistry['rk1'].y - 20} 
                            x2={500} y2={stationRegistry['r3'].y + 20} 
                            stroke="#E3002C" strokeWidth="8" strokeLinecap="round" 
                        />
                        <line 
                            x1={stationRegistry['o1'].x - 20} y1={500} 
                            x2={stationRegistry['ot1'].x + 20} y2={500} 
                            stroke="#F6A800" strokeWidth="8" strokeLinecap="round" 
                        />

                        {/* --- DRAW THE STATIONS --- */}
                        {Object.values(stationRegistry).map((station, i) => (
                            <g key={`station-${i}`}>
                                <circle 
                                    cx={station.x} cy={station.y} r="5" 
                                    fill="#FFFFFF" stroke="#333" strokeWidth="2" 
                                />
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

                        {/* --- DRAW THE ACTIVE TRAINS --- */}
                        {trainsToRender.map((train, i) => (
                            <g key={`train-${train.trainId}-${i}`}>
                                {/* Track Connector Line */}
                                <line 
                                    x1={train.x} y1={train.y} 
                                    x2={train.line === 'R' ? 500 : train.x} 
                                    y2={train.line === 'O' ? 500 : train.y} 
                                    stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"
                                />
                                
                                <g transform={`translate(${train.x}, ${train.y})`}>
                                    {/* Rotating Train Icon */}
                                    <image 
                                        href={train.imgSrc} 
                                        xlinkHref={train.imgSrc}
                                        x={-25} 
                                        y={-12.5} 
                                        width={50} 
                                        height={25} 
                                        transform={`rotate(${train.angle})`}
                                    />

                                    {/* Accurately Rotated & Offset Text ID */}
                                    <text 
                                        transform={train.textTransform}
                                        fill="#FFFFFF" 
                                        fontSize="12px" 
                                        fontWeight="bold" 
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,1)", pointerEvents: 'none' }}
                                    >
                                        {train.trainId}
                                    </text>
                                </g>
                            </g>
                        ))}
                    </svg>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}