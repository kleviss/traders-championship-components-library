import './CompetitionCard.css';

import PropTypes from 'prop-types';
import { useState } from 'react';

const CompetitionCard = ({ config }) => {
  const [selectedAccountSize, setSelectedAccountSize] = useState(config.accountSizes[0].size);

  const getEntryFee = () => {
    const account = config.accountSizes.find((acc) => acc.size === selectedAccountSize);
    return account ? account.fee : config.accountSizes[0].fee;
  };

  return (
    <div className='competition-card'>
      <div className='left-section'>
        <h1 className='title'>14 Day Competition</h1>
        <div className='input-row'>
          <div className='input-group'>
            <div className='input-label'>Account Size:</div>
            <select
              value={selectedAccountSize}
              onChange={(e) => setSelectedAccountSize(e.target.value)}
            >
              {config.accountSizes.map((acc, index) => (
                <option key={index} value={acc.size}>
                  {acc.size}
                </option>
              ))}
            </select>
          </div>
          <div className='input-group'>
            <div className='input-label'>Entry Fee:</div>
            <div className='entry-fee'>{getEntryFee()}</div>
          </div>
        </div>
        <button className='start-button'>Start Trading Now</button>
      </div>

      <div className='right-section'>
        <div className='info-grid'>
          <div className='info-item'>
            <span className='info-label'>Min Days</span>
            <span className='info-value'>{config.minDays}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Time Limit</span>
            <span className='info-value'>Unlimited</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Max Loss</span>
            <span className='info-value'>{config.maxLoss}%</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Max Profit From Single Trade</span>
            <span className='info-value'>{config.maxProfit}%</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Min Trade Hold Time</span>
            <span className='info-value'>{config.minHoldTime}s</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>SL/TP Required</span>
            <span className='info-value'>{config.slTpRequired ? '✓' : '✕'}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>Refund</span>
            <span className='info-value'>{config.refund ? '✓' : '✕'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CompetitionCard.propTypes = {
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

export default CompetitionCard;
