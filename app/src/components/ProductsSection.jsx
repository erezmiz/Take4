import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';
import './ProductsSection.css';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      const { data, error: err } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchRequests();
  }, []);

  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <h2 className="products-title">בקשות פופולריות</h2>
          <p className="products-subtitle">עזרו לאחרים והרוויחו תגמולים בטיול הבא שלכם</p>
        </div>
        <button className="view-all-btn">
          צפה בהכל <span className="arrow">→</span>
        </button>
      </div>

      {loading && (
        <div className="products-state">
          <span className="products-state-icon material-symbols-outlined">sync</span>
          <p>טוען בקשות...</p>
        </div>
      )}

      {error && (
        <div className="products-state products-state--error">
          <span className="products-state-icon material-symbols-outlined">error</span>
          <p>שגיאה בטעינת הבקשות: {error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="products-state">
          <span className="products-state-icon material-symbols-outlined">inbox</span>
          <p>אין בקשות עדיין. היו הראשונים לפרסם!</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image_url}
              title={product.title}
              country={product.destination_country}
              origin={null}
              destination={product.destination_country}
              reward={product.max_price ?? 0}
              badges={[]}
            />
          ))}
        </div>
      )}
    </section>
  );
}
