import React, { useState } from 'react';
import VoiceInput from './VoiceInput';
import AutoServiceChart from './AutoServiceChart';

const Dashboard = () => {
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const processVoiceCommand = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/processQuery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setQueryResult(data);
      }
    } catch (err) {
      setError('Failed to process query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Auto Service Analytics Dashboard</h1>
      <VoiceInput onTranscriptReceived={processVoiceCommand} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {queryResult && (
        <AutoServiceChart
          data={queryResult.data}
          type={queryResult.visualizationType}
          title={queryResult.title}
        />
      )}
    </div>
  );
};

export default Dashboard;
