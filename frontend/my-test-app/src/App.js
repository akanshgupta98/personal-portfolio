import React, { useState, useCallback } from 'react';

const SimpleTestApp = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8081/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      setApiResponse(data);
    } catch (error) {
      setError(error.message);
      setApiResponse(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Simple React Test App</h1>
      <button
        onClick={fetchData}
        disabled={loading}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          backgroundColor: loading ? '#808080' : '#4CAF50', // Green or Gray
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease',
          marginBottom: '1rem',
        }}
      >
        {loading ? 'Loading...' : 'Fetch Data from /'}
      </button>

      {apiResponse && (
        <div style={{ padding: '1rem', backgroundColor: '#e0f7fa', border: '1px solid #b2ebf2', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <p>Response from server: <span style={{ fontWeight: 'bold' }}>{apiResponse}</span></p>
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#ffe082', border: '1px solid #ffb300', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleTestApp;
