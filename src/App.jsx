import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import DataEntry from './pages/DataEntry';
import Ledger from './pages/Ledger';
import TaxAbsorption from './pages/TaxAbsorption';
import Wealth from './pages/Wealth';

// Upgraded realistic default transactions to match the premium UI
const initialTransactions = [
  { id: 1, date: '10 Apr 2026', desc: 'Raw Material Purchase', cat: 'Inventory', type: 'Expense', amount: 45000 },
  { id: 2, date: '12 Apr 2026', desc: 'Wholesale Order #102', cat: 'Sales', type: 'Income', amount: 120000 },
  { id: 3, date: '15 Apr 2026', desc: 'Electricity Bill', cat: 'Utilities', type: 'Expense', amount: 18000 },
  { id: 4, date: '16 Apr 2026', desc: 'Direct Sale', cat: 'Sales', type: 'Income', amount: 35000 },
];

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [transactions, setTransactions] = useState(initialTransactions);

  // Function to add a new transaction and keep the latest at the top
  const addTransaction = (newTx) => {
    setTransactions([{ id: Date.now(), ...newTx }, ...transactions]);
    // Optional: You can trigger a success toast/notification here later
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': 
        return <Home transactions={transactions} />;
      case 'DataEntry': 
        return <DataEntry addTransaction={addTransaction} setActiveTab={setActiveTab} />;
      case 'Ledger': 
        return <Ledger transactions={transactions} />;
      case 'TaxAbsorption': 
        return <TaxAbsorption transactions={transactions} />;
      case 'Wealth': 
        return <Wealth transactions={transactions} />;
      default: 
        return <Home transactions={transactions} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Adding a subtle fade transition wrapper for a smoother UX */}
      <div className="animate-fade-in w-full h-full">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;