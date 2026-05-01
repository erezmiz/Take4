import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import ChatPage from './pages/ChatPage';
import NewRequestPage from './pages/NewRequestPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('new-request');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'product':
        return <ProductPage onNavigate={setCurrentPage} />;
      case 'chat':
        return <ChatPage onNavigate={setCurrentPage} />;
      case 'new-request':
        return <NewRequestPage onNavigate={setCurrentPage} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
