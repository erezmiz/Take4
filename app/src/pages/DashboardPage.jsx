import SearchProduct from '../components/SearchProduct';
import ProductsSection from '../components/ProductsSection';
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard-page" dir="rtl">
      
      <main className="dashboard-main">
        <SearchProduct />
        <ProductsSection />
        
        <button className="fab-button">
          ➕
        </button>
      </main>
      
    </div>
  );
}
