import './ProductDetails.css';

export default function ProductDetails() {
  return (
    <div className="details-container">
      <div className="header-info">
        <div className="verified-badge">
          <span className="material-symbols-outlined">verified</span>
          בקשה מאומתת
        </div>
        <h1 className="product-title">מכונת אספרסו Brezza Pro</h1>
        <p className="product-locations">
          התבקש מ: <span className="location">מילאנו, איטליה</span> אל <span className="location">דובאי, איחוד האמירויות</span>
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-item">
          <p className="bento-label">משקל הפריט</p>
          <div className="bento-value">
            <span className="material-symbols-outlined weight-icon">weight</span>
            <span>4.5 ק"ג</span>
          </div>
        </div>
        <div className="bento-item">
          <p className="bento-label">תגמול למטייל</p>
          <div className="bento-value">
            <span className="material-symbols-outlined reward-icon">payments</span>
            <span className="reward-amount">$120.00</span>
          </div>
        </div>
      </div>

      <div className="user-info">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO0z5z5yUTTiC1cYiAE2MeHDpkHhh5-ZqGEVP2rWe1fe2chDZ95feTje6meTOcJapFUxWOVKWM47ywpPJI0Rc_hINknuSR2PnOO92TunXPIvUtOBJsQTGa7o5DVJoZhbk1Gmjh238W1cXgoCIA_z-nU5hE6RfpkZxGAg-FyFl6gERksFimeeMvEjL5Ed_OFcTWz9maWemuOPYO-1KTUD0IdRFN3WJtLZUem25XM-7Xk1CclEgWrXw2FQnGFCMOf5L2pSv9CbiCaYnz" alt="Ahmed Khalil" className="user-avatar" />
        <div className="user-details">
          <h4 className="user-name">אחמד חליל</h4>
          <div className="user-rating">
            <div className="stars">
              <span className="material-symbols-outlined fill">star</span>
              <span className="material-symbols-outlined fill">star</span>
              <span className="material-symbols-outlined fill">star</span>
              <span className="material-symbols-outlined fill">star</span>
              <span className="material-symbols-outlined fill">star</span>
            </div>
            <span className="review-count">(48 חוות דעת)</span>
          </div>
        </div>
        <span className="material-symbols-outlined info-icon">info</span>
      </div>

      <div className="cta-section">
        <div className="escrow-info">
          <div className="escrow-lock">
            <span className="material-symbols-outlined">lock</span>
            <span>תשלום מאובטח בנאמנות (Escrow)</span>
          </div>
          <span className="handling-fee">דמי טיפול: $8.50</span>
        </div>
        <div className="cta-buttons">
          <button className="pay-button">
            <span>שלם בנאמנות</span>
            <span className="pay-amount">($128.50)</span>
          </button>
          <button className="chat-button">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span>פתח צ'אט</span>
          </button>
        </div>
        <div className="safety-info">
          <span className="material-symbols-outlined">security</span>
          <p>
            התשלום שלך מוחזק בבטחה בנאמנות ומשוחרר למטייל רק לאחר שתאשר את קבלת הפריט. <a href="#" className="learn-more">למד עוד על אמון ובטיחות.</a>
          </p>
        </div>
      </div>
    </div>
  );
}
