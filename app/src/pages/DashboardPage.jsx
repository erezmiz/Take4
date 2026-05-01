import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchProduct from '../components/SearchProduct';
import ProductsSection from '../components/ProductsSection';
import './DashboardPage.css';

export default function DashboardPage({ onNavigate }) {
  return (
    <div className="dashboard-page" dir="rtl">
      <Navbar onNavigate={onNavigate} />
      <main className="dashboard-main">
        <SearchProduct />
        <ProductsSection />
        
        <button className="fab-button">
          ➕
        </button>
      </main>
      <Footer />
    </div>
  );
}
