import React from 'react';
import ClimateSimulator from './pages/ClimateSimulator';

function App() {
  return (
    <div className="h-screen max-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900" style={{ WebkitOverflowScrolling: 'touch' }}>
      <ClimateSimulator />
    </div>
  );
}

export default App;
