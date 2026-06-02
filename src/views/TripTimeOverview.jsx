import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../theme.css';
import { AnalyzedTripTimeCard } from '../components/AnalyzedTripTimeCard';

export default function PageView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; 
  const [analyzedData, setAnalyzedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const result = await window.api.getAnalyzedData(id);
        setAnalyzedData(result.data);
      } catch (error) {
        console.error("Err when calling window.api:", error);
      } finally {
        setIsLoading(false);
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
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-panel)', borderRadius: '6px', border: '1px solid var(--border-color)',height: '100vh', flexDirection: 'row'}}>
        <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>result：</h3>
        { isLoading ? (
          <h2>Loading Data...</h2>
        ) : (
          Array.isArray(analyzedData) && analyzedData.length > 0 ? (
            analyzedData.map((d, index) => (
              <AnalyzedTripTimeCard key={d.Date || index} AnalyzedData={d} index={index}></AnalyzedTripTimeCard>
            ))
          ) : (
            <h2>No Analyzed Data</h2>
          )
        )
        }
      </div>
    </div>
  );
}
