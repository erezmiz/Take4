import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './MyRequests.css';

const SIZE_LABEL = { small: 'קטן', medium: 'בינוני', large: 'גדול' };
const STATUS_LABEL = { new: 'חדש' };

export default function MyRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from('requests')
      .select('id, title, destination_country, meet_deliver, max_price, deliver_pay, image_url, status, size, broken, deliver_date, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setRequests(data || []);
        setLoading(false);
      });
  }, [user]);

  return (
    <section className="my-requests-section">
      <div className="my-requests-header">
        <div>
          <h2>הפרסומים שלי</h2>
          <p>כל הבקשות שפרסמת לקהילה</p>
        </div>
        <button className="my-requests-new-btn" onClick={() => navigate('/new-request')}>
          + בקשה חדשה
        </button>
      </div>

      {loading && <p className="my-requests-empty">טוען פרסומים...</p>}

      {!loading && requests.length === 0 && (
        <p className="my-requests-empty">עדיין לא פרסמת בקשות. לחץ על "+ בקשה חדשה" כדי להתחיל.</p>
      )}

      {!loading && requests.length > 0 && (
        <div className="my-requests-list">
          {requests.map((req) => (
            <div
              key={req.id}
              className="my-request-card"
              onClick={() => navigate(`/product/${req.id}`)}
            >
              <div className="my-request-image">
                {req.image_url ? (
                  <img src={req.image_url} alt={req.title} />
                ) : (
                  <div className="my-request-image-placeholder">
                    {req.title?.charAt(0) || '?'}
                  </div>
                )}
              </div>

              <div className="my-request-details">
                <div className="my-request-top">
                  <h3 className="my-request-title">{req.title}</h3>
                  <span className={`my-request-status my-request-status--${req.status}`}>
                    {STATUS_LABEL[req.status] ?? req.status}
                  </span>
                </div>

                <div className="my-request-meta">
                  {req.destination_country && (
                    <span className="meta-item">✈ {req.destination_country}</span>
                  )}
                  {req.meet_deliver && (
                    <span className="meta-item">📍 {req.meet_deliver}</span>
                  )}
                  {req.size && (
                    <span className="meta-item">📦 {SIZE_LABEL[req.size] ?? req.size}</span>
                  )}
                  {req.broken && (
                    <span className="meta-item meta-item--fragile">⚠️ שביר</span>
                  )}
                  {req.deliver_date && (
                    <span className="meta-item">
                      📅 {new Date(req.deliver_date).toLocaleDateString('he-IL')}
                    </span>
                  )}
                </div>

                <div className="my-request-prices">
                  {req.max_price != null && (
                    <span className="price-badge">
                      תקציב: <strong>${Number(req.max_price).toFixed(2)}</strong>
                    </span>
                  )}
                  {req.deliver_pay != null && (
                    <span className="price-badge price-badge--deliver">
                      תגמול: <strong>${Number(req.deliver_pay).toFixed(2)}</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="my-request-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="my-req-edit-btn"
                  onClick={() => navigate(`/new-request/${req.id}`)}
                >
                  עריכה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
