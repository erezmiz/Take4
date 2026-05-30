import './ProductDetails.css';

export default function ProductDetails({ request }) {
  const { title, destination_country, max_price, deliver_pay, product_url, status } = request;

  return (
    <div className="details-container">

      <div className="header-info">
        <h1 className="product-title">{title}</h1>
        {destination_country && (
          <p className="product-destination">
            יעד למסירה: <span className="location">{destination_country}</span>
          </p>
        )}
      </div>

      {destination_country && (
        <div className="route-section">
          <span className="route-label">מסלול</span>
          <div className="route-track">
            <span className="route-dot" />
            <span className="route-city">{destination_country}</span>
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
