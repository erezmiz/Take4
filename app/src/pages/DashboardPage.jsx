import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchProduct from '../components/SearchProduct';
import ProductsSection from '../components/ProductsSection';
import './DashboardPage.css';

const INITIAL_FILTERS = {
  destinations: [],
  minReward:    'הכל',
  size:         '',
  fragile:      false,
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="dashboard-page" dir="rtl">
      <main className="dashboard-main">
        <SearchProduct
          filters={filters}
          onFiltersChange={setFilters}
          initialFilters={INITIAL_FILTERS}
        />
        <ProductsSection filters={filters} />

        <button className="fab-button" onClick={() => navigate('/new-request')}>
          ➕
        </button>
      </main>
    </div>
  );
}
