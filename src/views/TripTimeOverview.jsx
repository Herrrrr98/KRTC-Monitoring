import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../theme.css';
import { AnalyzedTripTimeCard } from '../AnalyzedTripTimeCard';

export default function PageView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; 
  const [analyzedData, setAnalyzedData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const result = await window.api.getAnalyzedData(id);
        setAnalyzedData(result);
      } catch (error) {
        console.error("Err when calling window.api:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!id) {
    return (
      <div style={{ color: 'var(--text-main)' }}>
        <p>ID Err</p>
        <button style={{ backgroundColor: 'var(--bg-btn)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }} onClick={() => navigate('/')}>回首頁</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', color: 'var(--text-main)', backgroundColor: 'var(--bg-trainLiveBox)'}}>
      <button 
        style={{ backgroundColor: 'var(--bg-btn)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }} 
        onClick={() => navigate('/')}
      >
        回首頁
      </button>
      
      <div style={{ marginTop: '15px', color: '#000000' }}>
         <span style={{ color: 'var(--text-orange)' }}>ID: {id}</span>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-panel)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>result：</h3>
        {analyzedData ? (
          <div>
            <pre style={{ maxHeight: '400px', overflow: 'auto', margin: '0', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'var(--text-meta)' }}>
            {JSON.stringify(analyzedData, null, 2)}
          </pre>
          </div>
        ) : (
          <p style={{ color: 'var(--text-meta)' }}>loading...</p>
        )}
      </div>
    </div>
  );
}
