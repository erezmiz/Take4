import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchProduct from '../components/SearchProduct';
import ProductsSection from '../components/ProductsSection';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, loading, openAuthModal } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const handleFab = () => {
    navigate('/new-request');
  };

  return (
    <div className="dashboard-page" dir="rtl">

      <main className="dashboard-main">
        <SearchProduct />
        <ProductsSection />

        <button className="fab-button" onClick={handleFab}>
          ➕
        </button>
      </main>

    </div>
  );
}
