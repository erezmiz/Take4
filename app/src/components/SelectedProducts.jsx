import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import SelectedProduct from './SelectedProduct';
import './SelectedProducts.css';

const STATUS_MAP = {
  pending:    'ממתין',
  paid:       'שולם (נאמנות)',
  purchased:  'נרכש',
  delivered:  'נמסר',
  completed:  'נמסר',
};

function mapStatus(escrowStatus) {
  return STATUS_MAP[escrowStatus] || 'ממתין';
}

export default function SelectedProducts() {
  const { user } = useAuth();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from('deals')
      .select(`
        id, escrow_status, created_at,
        requests (
          id, title, destination_country, meet_deliver,
          max_price, deliver_pay, image_url
        )
      `)
      .eq('traveler_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setDeals(data || []);
        setLoading(false);
      });
  }, [user]);

  return (
    <section className="deals-section">
      <div className="deals-header">
        <div>
          <h2>עסקאות פעילות</h2>
          <p>עקוב אחר הבקשות הפעילות שלך בקהילה</p>
        </div>
        <button className="history-btn">צפה בהיסטוריה</button>
      </div>

      {loading && <p className="deals-empty">טוען עסקאות...</p>}

      {!loading && deals.length === 0 && (
        <p className="deals-empty">אין עסקאות פעילות עדיין.</p>
      )}

      {!loading && deals.length > 0 && (
        <div className="deals-list">
          {deals.map((deal) => (
            <SelectedProduct
              key={deal.id}
              deal={{
                name:      deal.requests?.title || '—',
                from:      deal.requests?.destination_country || '—',
                to:        deal.requests?.meet_deliver || '—',
                price:     Number(deal.requests?.max_price ?? deal.requests?.deliver_pay ?? 0).toFixed(2),
                status:    mapStatus(deal.escrow_status),
                imageUrl:  deal.requests?.image_url || null,
                requestId: deal.requests?.id,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
