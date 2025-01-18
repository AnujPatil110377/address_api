'use client';

import { useState } from 'react';

export default function AddressComparer() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const compareAddresses = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/compare-addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address1, address2 }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={compareAddresses} className="address-form">
        <div className="input-group">
          <label className="input-label">First Address</label>
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="address-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Second Address</label>
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="address-input"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Comparing...' : 'Compare Addresses'}
        </button>
      </form>

      {result && (
        <div className="result-box">
          <div className="result-content">
            <p className="result-item">
              <span className="result-label">Match:</span>
              <span className={result.match ? 'match-yes' : 'match-no'}>
                {result.match ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="result-item">
              <span className="result-label">Confidence:</span>
              <span>{(result.confidenceLevel * 100).toFixed(1)}%</span>
            </p>
            <p className="result-item">
              <span className="result-label">Explanation:</span>
              <span className="explanation-text">{result.explanation}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 