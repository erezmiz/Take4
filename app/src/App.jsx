import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('product');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'product':
        return <ProductPage onNavigate={setCurrentPage} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
