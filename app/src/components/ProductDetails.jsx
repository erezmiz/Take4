import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './ProductDetails.css';

export default function ProductDetails({ request, isOwner }) {
  const navigate = useNavigate();
  const {
    title, destination_country, meet_deliver,
    max_price, deliver_pay, product_url, status,
    broken, size,
  } = request;

  const sizeLabel = { small: 'קטן', medium: 'בינוני', large: 'גדול' };

  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      const { error: dealsError } = await supabase
        .from('deals')
        .delete()
        .eq('request_id', request.id);
      if (dealsError) throw dealsError;

      const { error: requestError } = await supabase
        .from('requests')
        .delete()
        .eq('id', request.id);
      if (requestError) throw requestError;

      navigate('/dashboard');
    } catch (err) {
      setDeleteError(err.message || 'שגיאה במחיקה. אנא נסה שנית.');
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="details-container">

      <div className="header-info">
        <div className="header-title-row">
          <h1 className="product-title">{title}</h1>
          {isOwner && (
            <div className="owner-actions">
              <button
                className="edit-request-btn"
                onClick={() => navigate(`/new-request/${request.id}`)}
              >
                <span className="material-symbols-outlined">edit</span>
                עריכה
              </button>
              <button
                className="delete-request-btn"
                onClick={() => setConfirming(true)}
              >
                <span className="material-symbols-outlined">delete</span>
                מחיקה
              </button>
            </div>
          )}
        </div>
        {destination_country && (
          <p className="product-destination">
            יעד הרכישה: <span className="location">{destination_country}</span>
          </p>
        )}
        {meet_deliver && (
          <p className="product-destination">
            יעד המסירה: <span className="location">{meet_deliver}</span>
          </p>
        )}
      </div>

      {confirming && (
        <div className="delete-confirm-banner">
          <p className="delete-confirm-text">
            האם למחוק את הבקשה? פעולה זו תמחק גם את כל העסקאות הקשורות ולא ניתנת לביטול.
          </p>
          {deleteError && <p className="delete-error">{deleteError}</p>}
          <div className="delete-confirm-actions">
            <button
              className="delete-confirm-yes"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'מוחק...' : 'כן, מחק'}
            </button>
            <button
              className="delete-confirm-cancel"
              onClick={() => { setConfirming(false); setDeleteError(''); }}
              disabled={deleting}
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {destination_country && (
        <div className="route-section">
          <span className="route-label">מסלול</span>
          <div className="route-track">
            <span className="route-dot" />
            <span className="route-city">{destination_country}</span>
            {meet_deliver && (
              <>
                <span className="route-arrow">←</span>
                <span className="route-city">{meet_deliver}</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="bento-grid">
        <div className="bento-item">
          <p className="bento-label">תגמול לשליח</p>
          <p className="bento-amount">
            {deliver_pay != null ? `$${Number(deliver_pay).toFixed(2)}` : '—'}
          </p>
        </div>
        <div className="bento-item">
          <p className="bento-label">מחיר מקסימלי</p>
          <p className="bento-amount">
            {max_price != null ? `$${Number(max_price).toFixed(2)}` : '—'}
          </p>
        </div>
        <div className="bento-item">
          <p className="bento-label">שביר</p>
          <p className={`bento-amount bento-amount--sm ${broken ? 'bento-fragile' : ''}`}>
            {broken ? 'כן ⚠️' : 'לא'}
          </p>
        </div>
        <div className="bento-item">
          <p className="bento-label">גודל חבילה</p>
          <p className="bento-amount bento-amount--sm">
            {size ? sizeLabel[size] ?? size : '—'}
          </p>
        </div>
      </div>

      <p className="status-line">
        סטטוס :&nbsp;
        <span className="status-value">{status === 'new' ? 'חדש' : status}</span>
      </p>

      {product_url && (
        <a href={product_url} target="_blank" rel="noopener noreferrer" className="product-page-link">
          קישור לדף המוצר
        </a>
      )}

      <div className="cta-section">
        <p className="escrow-text">תשלומים מאובטחים בנאמנות (Escrow)</p>

        <div className="cta-buttons">
          <button className="pay-button">הרשם לביצוע המשלוח</button>
          <button className="chat-button">עבור לשיחה עם יוצר הבקשה</button>
        </div>

        <div className="safety-info">
          <span className="material-symbols-outlined">security</span>
          <p>
            התשלום שלך מוחזק בבטחה בנאמנות ומשוחרר למטייל רק לאחר שתאשר את קבלת הפריט.{' '}
            <a href="#" className="learn-more">למד עוד על אמון ובטיחות.</a>
          </p>
        </div>
      </div>

    </div>
  );
}
