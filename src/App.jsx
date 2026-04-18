import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import DataEntry from './pages/DataEntry';
import Ledger from './pages/Ledger';
import TaxAbsorption from './pages/TaxAbsorption';
import Wealth from './pages/Wealth';

// Yeh hamara initial data hai jo shuru mein nazar aayega
const initialTransactions = [
  { id: 1, date: '2026-04-10', desc: 'Raw Material Purchase', cat: 'Inventory', type: 'Expense', amount: 45000 },
  { id: 2, date: '2026-04-12', desc: 'Wholesale Order #102', cat: 'Sales', type: 'Income', amount: 120000 },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState(initialTransactions);

  // Yeh function naya data add karega
  const addTransaction = (newTx) => {
    setTransactions([{ id: Date.now(), ...newTx }, ...transactions]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <Home transactions={transactions} />;
      case 'DataEntry': return <DataEntry addTransaction={addTransaction} setActiveTab={setActiveTab} />;
      case 'Ledger': return <Ledger transactions={transactions} />;
      case 'TaxAbsorption': return <TaxAbsorption transactions={transactions} />;
      case 'Wealth': return <Wealth />;
      default: return <Home transactions={transactions} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;