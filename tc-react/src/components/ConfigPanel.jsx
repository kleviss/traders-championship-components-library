import './ConfigPanel.css';

import PropTypes from 'prop-types';
import { useState } from 'react';

const ConfigPanel = ({ config, onConfigChange }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSize, setNewSize] = useState('');

  const handleAccountSizeChange = (index, field, value) => {
    const newAccountSizes = [...config.accountSizes];
    if (field === 'fee') {
      if (!value.startsWith('$')) {
        value = '$' + value;
      }
    }
    newAccountSizes[index] = { ...newAccountSizes[index], [field]: value };
    onConfigChange({ ...config, accountSizes: newAccountSizes });
  };

  const handleNewSizeSubmit = (e) => {
    e.preventDefault();
    if (!newSize) return;

    let formattedSize = newSize;
    if (!formattedSize.startsWith('$')) {
      formattedSize = '$' + formattedSize;
    }
    // Remove any non-numeric characters except $ for validation
    const numericValue = formattedSize.replace(/[^0-9]/g, '');
    if (!numericValue) return;

    const lastAccount = config.accountSizes[config.accountSizes.length - 1];
    onConfigChange({
      ...config,
      accountSizes: [
        ...config.accountSizes,
        {
          size: formattedSize,
          fee: '$100',
          minDays: lastAccount.minDays,
          maxLoss: lastAccount.maxLoss,
          maxProfit: lastAccount.maxProfit,
          minHoldTime: lastAccount.minHoldTime,
          slTpRequired: lastAccount.slTpRequired,
          refund: lastAccount.refund,
        },
      ],
      selectedSize: formattedSize,
    });
    setIsAddingNew(false);
    setNewSize('');
  };

  const removeAccountSize = (index) => {
    if (config.accountSizes.length > 1) {
      const newAccountSizes = config.accountSizes.filter((_, i) => i !== index);
      onConfigChange({
        ...config,
        accountSizes: newAccountSizes,
        selectedSize: newAccountSizes[0].size,
      });
    }
  };

  const handleAccountSelect = (size) => {
    onConfigChange({ ...config, selectedSize: size });
  };

  return (
    <div className='config-panel'>
      <h2 className='config-title'>Configuration</h2>

      {/* Account Size Selection */}
      <div className='account-selector'>
        {config.accountSizes.map((acc) => (
          <button
            key={acc.size}
            className={`account-tab ${acc.size === config.selectedSize ? 'active' : ''}`}
            onClick={() => handleAccountSelect(acc.size)}
          >
            {acc.size}
          </button>
        ))}
        {isAddingNew ? (
          <form className='new-size-form' onSubmit={handleNewSizeSubmit}>
            <input
              type='text'
              className='new-size-input'
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder='Enter size...'
              autoFocus
            />
            <button type='submit' className='new-size-submit'>
              Add
            </button>
            <button
              type='button'
              className='new-size-cancel'
              onClick={() => {
                setIsAddingNew(false);
                setNewSize('');
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button className='account-tab add' onClick={() => setIsAddingNew(true)}>
            +
          </button>
        )}
      </div>

      {/* Current Account Configuration */}
      {config.accountSizes.map(
        (acc, index) =>
          acc.size === config.selectedSize && (
            <form key={index} className='config-form' onSubmit={(e) => e.preventDefault()}>
              <div className='config-group'>
                <label className='config-label'>Account Size & Entry Fee</label>
                <div className='account-row'>
                  <input type='text' className='config-input' value={acc.size} disabled readOnly />
                  <input
                    type='text'
                    className='config-input'
                    value={acc.fee}
                    onChange={(e) => handleAccountSizeChange(index, 'fee', e.target.value)}
                    placeholder='Entry Fee'
                  />
                  {config.accountSizes.length > 1 && (
                    <button
                      type='button'
                      className='delete-account'
                      onClick={() => removeAccountSize(index)}
                      aria-label='Delete account size'
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className='config-group'>
                <label className='config-label'>Min Days</label>
                <input
                  type='number'
                  className='config-input'
                  value={acc.minDays}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'minDays', parseInt(e.target.value) || 0)
                  }
                  min='0'
                />
              </div>

              <div className='config-group'>
                <label className='config-label'>Max Loss (%)</label>
                <input
                  type='number'
                  className='config-input'
                  value={acc.maxLoss}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'maxLoss', parseInt(e.target.value) || 0)
                  }
                  min='0'
                  max='100'
                />
              </div>

              <div className='config-group'>
                <label className='config-label'>Max Profit From Single Trade (%)</label>
                <input
                  type='number'
                  className='config-input'
                  value={acc.maxProfit}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'maxProfit', parseInt(e.target.value) || 0)
                  }
                  min='0'
                  max='100'
                />
              </div>

              <div className='config-group'>
                <label className='config-label'>Min Trade Hold Time (seconds)</label>
                <input
                  type='number'
                  className='config-input'
                  value={acc.minHoldTime}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'minHoldTime', parseInt(e.target.value) || 0)
                  }
                  min='0'
                />
              </div>

              <div className='config-group'>
                <label className='config-label'>SL/TP Required</label>
                <select
                  className='config-input'
                  value={acc.slTpRequired}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'slTpRequired', e.target.value === 'true')
                  }
                >
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>

              <div className='config-group'>
                <label className='config-label'>Refund Available</label>
                <select
                  className='config-input'
                  value={acc.refund}
                  onChange={(e) =>
                    handleAccountSizeChange(index, 'refund', e.target.value === 'true')
                  }
                >
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>
            </form>
          )
      )}
    </div>
  );
};

ConfigPanel.propTypes = {
  config: PropTypes.shape({
    accountSizes: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        fee: PropTypes.string.isRequired,
        minDays: PropTypes.number.isRequired,
        maxLoss: PropTypes.number.isRequired,
        maxProfit: PropTypes.number.isRequired,
        minHoldTime: PropTypes.number.isRequired,
        slTpRequired: PropTypes.bool.isRequired,
        refund: PropTypes.bool.isRequired,
      })
    ).isRequired,
    selectedSize: PropTypes.string.isRequired,
  }).isRequired,
  onConfigChange: PropTypes.func.isRequired,
};

export default ConfigPanel;
