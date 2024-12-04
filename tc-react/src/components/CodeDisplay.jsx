import './CodeDisplay.css';

import PropTypes from 'prop-types';
import { useState } from 'react';

const CodeDisplay = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const generateStyles = () => {
    // Get all style tags from the document
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          console.warn('Could not read stylesheet:', e);
          return '';
        }
      })
      .join('\n');

    // Filter out only the styles we need
    return styles
      .split('\n')
      .filter(
        (rule) =>
          rule.includes('.competition-card') ||
          rule.includes('.left-section') ||
          rule.includes('.right-section') ||
          rule.includes('.title') ||
          rule.includes('.input-row') ||
          rule.includes('.input-group') ||
          rule.includes('.input-label') ||
          rule.includes('.entry-fee') ||
          rule.includes('.start-button') ||
          rule.includes('.info-item') ||
          rule.includes('.info-label') ||
          rule.includes('.info-value') ||
          rule.includes('@media')
      )
      .join('\n');
  };

  const generateHTML = () => {
    const styles = generateStyles();
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>14 Day Competition</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      body {
        min-height: 100vh;
        background-color: #f5f5f5;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ${styles}
    </style>
  </head>
  <body>
    <div class="competition-card">
      <div class="left-section">
        <h1 class="title">14 Day Competition</h1>
        <div class="input-row">
          <div class="input-group">
            <div class="input-label">Account Size:</div>
            <select id="accountSize" onchange="updateValues()">
              ${config.accountSizes
                .map(
                  (acc) => `<option value="${acc.size.replace(/[^0-9]/g, '')}">${acc.size}</option>`
                )
                .join('\n              ')}
            </select>
          </div>
          <div class="input-group">
            <div class="input-label">Entry Fee:</div>
            <div class="entry-fee" id="entryFee">${config.accountSizes[0].fee}</div>
          </div>
        </div>
        <button class="start-button">Start Trading Now</button>
      </div>

      <div class="right-section">
        <div class="info-item">
          <span class="info-label">Min Days</span>
          <span class="info-value">${config.minDays}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Time Limit</span>
          <span class="info-value">Unlimited</span>
        </div>
        <div class="info-item">
          <span class="info-label">Max Loss</span>
          <span class="info-value">${config.maxLoss}%</span>
        </div>
        <div class="info-item">
          <span class="info-label">Max Profit From Single Trade</span>
          <span class="info-value">${config.maxProfit}%</span>
        </div>
        <div class="info-item">
          <span class="info-label">Min Trade Hold Time</span>
          <span class="info-value">${config.minHoldTime}s</span>
        </div>
        <div class="info-item">
          <span class="info-label">SL/TP Required</span>
          <span class="info-value">${config.slTpRequired ? '✓' : '✕'}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Refund</span>
          <span class="info-value">${config.refund ? '✓' : '✕'}</span>
        </div>
      </div>
    </div>

    <script>
      function updateValues() {
        const accountSize = document.getElementById('accountSize').value;
        const fees = ${JSON.stringify(
          config.accountSizes.reduce((obj, item) => {
            obj[item.size.replace(/[^0-9]/g, '')] = item.fee;
            return obj;
          }, {})
        )};
        document.getElementById('entryFee').textContent = fees[accountSize];
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
