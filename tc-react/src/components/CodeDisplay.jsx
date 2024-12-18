import './CodeDisplay.css';

import PropTypes from 'prop-types';
import { useState } from 'react';

const CodeDisplay = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14 Day Competition</title>
    <style>
      /* Reset styles only for competition card */
      .tc-competition-wrapper * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .tc-competition-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        width: 100%;
        max-width: 1200px;
        margin: 2rem auto;
      }

      .tc-competition-card {
        background: linear-gradient(#0003, #0003), linear-gradient(104.75deg, #8e63c3, #3c0c62);
        position: relative;
        padding: 2rem;
        border-radius: 20px;
        width: 93%;
        color: white;
        display: flex;
        gap: 3rem;
        box-shadow: 0 4px 15px rgba(88, 75, 124, 0.3);
        margin: 0 auto;
      }

      .tc-left-section {
        flex: 1;
      }

      .tc-right-section {
        flex: 1;
        margin-top: 3rem;
      }

      .tc-title {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        font-weight: bold;
        color: white;
      }

      .tc-input-row {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .tc-input-group {
        flex: 1;
      }

      .tc-input-label {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
        color: white;
      }

      .tc-competition-card select,
      .tc-entry-fee {
        width: 90%;
        border-radius: 12px;
        border: none;
        font-size: 1.2rem;
        background: rgba(255, 255, 255, 0.95);
        color: #584b7c;
        padding: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .tc-competition-card select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23584B7C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        padding-right: 2.5rem;
        cursor: pointer;
      }

      .tc-start-button {
        width: 100%;
        padding: 1rem;
        border-radius: 12px;
        border: none;
        background: rgba(255, 255, 255, 0.95);
        color: #584b7c;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .tc-start-button:hover {
        background: white;
        transform: translateY(-1px);
      }

      .tc-info-grid {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1.2rem 2rem;
      }

      .tc-info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        padding: 0.5rem 0;
      }

      .tc-info-label {
        font-size: 1rem;
        color: white;
        opacity: 0.9;
      }

      .tc-info-value {
        font-size: 1rem;
        color: white;
        font-weight: 500;
      }

      @media (max-width: 1200px) {
        .tc-competition-card {
          flex-direction: column;
          gap: 2rem;
          width: 95%;
        }
        
        .tc-right-section {
          margin-top: 1rem;
        }
      }

      @media (max-width: 600px) {
        .tc-input-row {
          flex-direction: column;
        }
        
        .tc-competition-card select,
        .tc-entry-fee {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="tc-competition-wrapper">
      <div class="tc-competition-card">
        <div class="tc-left-section">
          <h1 class="tc-title">14 Day Competition</h1>
          <div class="tc-input-row">
            <div class="tc-input-group">
              <div class="tc-input-label">Account Size:</div>
              <select id="tc-accountSize" onchange="updateValues()">
                ${config.accountSizes
                  .map(
                    (acc) =>
                      `<option value="${acc.size.replace(/[^0-9]/g, '')}">${acc.size}</option>`
                  )
                  .join('\n                ')}
              </select>
            </div>
            <div class="tc-input-group">
              <div class="tc-input-label">Entry Fee:</div>
              <div class="tc-entry-fee" id="tc-entryFee">${config.accountSizes[0].fee}</div>
            </div>
          </div>
          <button class="tc-start-button">Start Trading Now</button>
        </div>

        <div class="tc-right-section">
          <div class="tc-info-grid">
            <div class="tc-info-item">
              <span class="tc-info-label">Min Days</span>
              <span class="tc-info-value">${config.minDays}</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">Time Limit</span>
              <span class="tc-info-value">Unlimited</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">Max Loss</span>
              <span class="tc-info-value">${config.maxLoss}%</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">Max Profit From Single Trade</span>
              <span class="tc-info-value">${config.maxProfit}%</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">Min Trade Hold Time</span>
              <span class="tc-info-value">${config.minHoldTime}s</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">SL/TP Required</span>
              <span class="tc-info-value">${config.slTpRequired ? '✓' : '✕'}</span>
            </div>
            <div class="tc-info-item">
              <span class="tc-info-label">Refund</span>
              <span class="tc-info-value">${config.refund ? '✓' : '✕'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      function updateValues() {
        const accountSize = document.getElementById('tc-accountSize').value;
        const fees = ${JSON.stringify(
          config.accountSizes.reduce((obj, item) => {
            obj[item.size.replace(/[^0-9]/g, '')] = item.fee;
            return obj;
          }, {})
        )};
        document.getElementById('tc-entryFee').textContent = fees[accountSize];
      }
    </script>
  </body>
</html>`;
    return html;
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '14-day-competition.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    const code = generateHTML();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className='code-container'>
      <button className='download-button' onClick={downloadHTML}>
        Download HTML
      </button>
      <button className='copy-button' onClick={copyCode}>
        {copied ? 'Copied!' : 'Copy Code'}
      </button>
      <div className='code-content'>
        <pre>{generateHTML()}</pre>
      </div>
    </div>
  );
};

CodeDisplay.propTypes = {
  config: PropTypes.shape({
    accountSizes: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        fee: PropTypes.string.isRequired,
      })
    ).isRequired,
    minDays: PropTypes.number.isRequired,
    maxLoss: PropTypes.number.isRequired,
    maxProfit: PropTypes.number.isRequired,
    minHoldTime: PropTypes.number.isRequired,
    slTpRequired: PropTypes.bool.isRequired,
    refund: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CodeDisplay;
