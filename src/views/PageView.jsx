import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
        console.log("get analyzed data:", result);

        setAnalyzedData(result);
      } catch (error) {
        console.error("Err when calling window.api:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!id) {
    return (
      <div>
        <p>ID Err</p>
        <button onClick={() => navigate('/')}>回首頁</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => navigate('/')}>回首頁</button>
      <div>ID: <span>{id}</span></div>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
        <h3>result：</h3>
        {analyzedData ? (
          <pre>{JSON.stringify(analyzedData, null, 2)}</pre>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
}
