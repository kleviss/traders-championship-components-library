import './App.css';

import CodeDisplay from './components/CodeDisplay';
import CompetitionCard from './components/CompetitionCard';
import ConfigPanel from './components/ConfigPanel';
import { useState } from 'react';

function App() {
  const [config, setConfig] = useState({
    accountSizes: [
      {
        size: '$10,000',
        fee: '$50',
        minDays: 0,
        maxLoss: 15,
        maxProfit: 8,
        minHoldTime: 120,
        slTpRequired: false,
        refund: false,
      },
    ],
    selectedSize: '$10,000',
  });

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  // Get the current account size's configuration
  const getCurrentConfig = () => {
    const currentAccount =
      config.accountSizes.find((acc) => acc.size === config.selectedSize) || config.accountSizes[0];
    return {
      accountSizes: config.accountSizes,
      minDays: currentAccount.minDays,
      maxLoss: currentAccount.maxLoss,
      maxProfit: currentAccount.maxProfit,
      minHoldTime: currentAccount.minHoldTime,
      slTpRequired: currentAccount.slTpRequired,
      refund: currentAccount.refund,
    };
  };

  return (
    <div className='page-container'>
      <div className='preview-container'>
        <CompetitionCard config={getCurrentConfig()} />
        <CodeDisplay config={getCurrentConfig()} />
      </div>
      <ConfigPanel config={config} onConfigChange={handleConfigChange} />
    </div>
  );
}

export default App;
