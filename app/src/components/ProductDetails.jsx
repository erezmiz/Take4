import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import './ProductDetails.css';

export default function ProductDetails({ request, isOwner }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    title, destination_country, meet_deliver,
    max_price, deliver_pay, product_url, status,
    broken, size, deliver_date,
  } = request;

  const formattedDeliverDate = deliver_date
    ? new Date(deliver_date).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  const sizeLabel = { small: 'קטן', medium: 'בינוני', large: 'גדול' };

  // ── Delete states ──
  const [confirming,   setConfirming]   = useState(false);
  const [deleting,     setDeleting]     = useState(false);
  const [deleteError,  setDeleteError]  = useState('');

  // ── Delivery registration states ──
  const [alreadyRegistered,    setAlreadyRegistered]    = useState(false);
  const [confirmingDelivery,   setConfirmingDelivery]   = useState(false);
  const [submittingDelivery,   setSubmittingDelivery]   = useState(false);
  const [deliverySuccess,      setDeliverySuccess]      = useState(false);
  const [deliveryError,        setDeliveryError]        = useState('');
  const [cancelingDelivery,    setCancelingDelivery]    = useState(false);
  const [cancelDeliveryError,  setCancelDeliveryError]  = useState('');

  useEffect(() => {
    if (!user || isOwner) return;
    supabase.from('deals')
      .select('id')
      .eq('request_id', request.id)
      .eq('traveler_id', user.id)
      .maybeSingle()
      .then(({ data }) => { if (data) setAlreadyRegistered(true); });
  }, [user, request.id, isOwner]);

  // ── Delete handler ──
  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      const { error: dealsError } = await supabase
        .from('deals').delete().eq('request_id', request.id);
      if (dealsError) throw dealsError;

      const { error: requestError } = await supabase
        .from('requests').delete().eq('id', request.id);
      if (requestError) throw requestError;

      navigate('/dashboard');
    } catch (err) {
      setDeleteError(err.message || 'שגיאה במחיקה. אנא נסה שנית.');
      setDeleting(false);
      setConfirming(false);
    }
  };

  // ── Delivery registration handler ──
  const handleDeliveryClick = () => {
    if (!user) { navigate('/auth'); return; }
    setConfirmingDelivery(true);
  };

  const handleConfirmDelivery = async () => {
    setSubmittingDelivery(true);
    setDeliveryError('');
    try {
      const now = new Date().toISOString();
      const { error } = await supabase.from('deals').insert({
        request_id:    request.id,
        traveler_id:   user.id,
        escrow_status: 'pending',
        created_at:    now,
        updated_at:    now,
      });
      if (error) throw error;
      setConfirmingDelivery(false);
      setDeliverySuccess(true);
      setAlreadyRegistered(true);
    } catch (err) {
      setDeliveryError(err.message || 'אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setSubmittingDelivery(false);
    }
  };

  // ── Cancel delivery handler ──
  const handleCancelDelivery = async () => {
    setCancelingDelivery(true);
    setCancelDeliveryError('');
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('request_id', request.id)
        .eq('traveler_id', user.id);
      if (error) throw error;
      setAlreadyRegistered(false);
      setDeliverySuccess(false);
    } catch (err) {
      setCancelDeliveryError(err.message || 'שגיאה בביטול. אנא נסה שנית.');
    } finally {
      setCancelingDelivery(false);
    }
  };

  // ── Delivery button config ──
  const deliveryButtonProps = (() => {
    if (isOwner)             return { label: 'הבקשה שלי',         disabled: true,  className: 'pay-button pay-button--disabled' };
    if (alreadyRegistered)   return { label: 'נרשמת למשלוח ✓',   disabled: true,  className: 'pay-button pay-button--success' };
    if (deliverySuccess)     return { label: 'נרשמת בהצלחה ✓',   disabled: true,  className: 'pay-button pay-button--success' };
    return { label: 'הרשם לביצוע המשלוח', disabled: false, className: 'pay-button', onClick: handleDeliveryClick };
  })();

  return (
    <div className="details-container">

      {/* ── Header ── */}
      <div className="header-info">
        <div className="header-title-row">
          <h1 className="product-title">{title}</h1>
          {isOwner && (
            <div className="owner-actions">
              <button className="edit-request-btn" onClick={() => navigate(`/new-request/${request.id}`)}>
                <span className="material-symbols-outlined">edit</span>
                עריכה
              </button>
              <button className="delete-request-btn" onClick={() => setConfirming(true)}>
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

      {/* ── Delete confirmation ── */}
      {confirming && (
        <div className="delete-confirm-banner">
          <p className="delete-confirm-text">
            האם למחוק את הבקשה? פעולה זו תמחק גם את כל העסקאות הקשורות ולא ניתנת לביטול.
          </p>
          {deleteError && <p className="delete-error">{deleteError}</p>}
          <div className="delete-confirm-actions">
            <button className="delete-confirm-yes" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'מוחק...' : 'כן, מחק'}
            </button>
            <button className="delete-confirm-cancel"
              onClick={() => { setConfirming(false); setDeleteError(''); }}
              disabled={deleting}
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* ── Route ── */}
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

      {/* ── Bento grid ── */}
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

      {formattedDeliverDate && (
        <p className="status-line">
          תאריך אחרון לקבלה :&nbsp;
          <span className="status-value">{formattedDeliverDate}</span>
        </p>
      )}

      {product_url && (
        <a href={product_url} target="_blank" rel="noopener noreferrer" className="product-page-link">
          קישור לדף המוצר
        </a>
      )}

      {/* ── CTA ── */}
      <div className="cta-section">
        <p className="escrow-text">תשלומים מאובטחים בנאמנות (Escrow)</p>

        {/* Delivery confirmation banner */}
        {confirmingDelivery && (
          <div className="delivery-confirm-banner">
            <p className="delivery-confirm-text">
              האם אתה מוכן לבצע את משלוח המוצר <strong>{title}</strong>
              {destination_country && <> מ-<strong>{destination_country}</strong></>}
              {meet_deliver && <> עד <strong>{meet_deliver}</strong></>}?
            </p>
            {deliveryError && <p className="delivery-error">{deliveryError}</p>}
            <div className="delivery-confirm-actions">
              <button
                className="delivery-confirm-yes"
                onClick={handleConfirmDelivery}
                disabled={submittingDelivery}
              >
                {submittingDelivery ? 'שומר...' : 'כן, אני מוכן'}
              </button>
              <button
                className="delivery-confirm-cancel"
                onClick={() => { setConfirmingDelivery(false); setDeliveryError(''); }}
                disabled={submittingDelivery}
              >
                ביטול
              </button>
            </div>
          </div>
        )}

        <div className="cta-buttons">
          <button
            className={deliveryButtonProps.className}
            disabled={deliveryButtonProps.disabled}
            onClick={deliveryButtonProps.onClick}
          >
            {deliveryButtonProps.label}
          </button>

          {(alreadyRegistered || deliverySuccess) && !isOwner && (
            <>
              <button
                className="cancel-delivery-btn"
                onClick={handleCancelDelivery}
                disabled={cancelingDelivery}
              >
                {cancelingDelivery ? 'מבטל...' : 'ביטול ביצוע שילוח'}
              </button>
              {cancelDeliveryError && (
                <p className="cancel-delivery-error">{cancelDeliveryError}</p>
              )}
            </>
          )}

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
