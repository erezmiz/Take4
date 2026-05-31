import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';
import './ProductsSection.css';

function parseMinReward(value) {
  if (!value || value === 'הכל') return null;
  const num = parseInt(value.replace(/\D/g, ''), 10);
  return isNaN(num) ? null : num;
}

export default function ProductsSection({ filters = {} }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const { destinations = [], minReward = 'הכל', size = '', fragile = false } = filters;

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (destinations.length > 0) {
        const orClause = destinations
          .map((d) => `destination_country.ilike.%${d}%`)
          .join(',');
        query = query.or(orClause);
      }

      if (size) {
        query = query.eq('size', size);
      }

      const minVal = parseMinReward(minReward);
      if (minVal !== null) {
        query = query.gte('deliver_pay', minVal);
      }

      if (fragile) {
        query = query.eq('broken', true);
      }

      const { data, error: err } = await query;

      if (err) setError(err.message);
      else setProducts(data);
      setLoading(false);
    }

    fetchRequests();
  }, [destinations, minReward, size, fragile]);

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
          <p>טוען בקשות...</p>
        </div>
      )}

      {error && (
        <div className="products-state products-state--error">
          <p>שגיאה בטעינת הבקשות: {error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="products-state">
          <p>לא נמצאו בקשות התואמות את הפילטרים.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
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
