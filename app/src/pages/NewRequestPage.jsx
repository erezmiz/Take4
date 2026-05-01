import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadSection from '../components/UploadSection';
import './NewRequestPage.css';

export default function NewRequestPage({ onNavigate }) {
  return (
    <div dir="rtl">
      <Navbar onNavigate={onNavigate} />
      <main className="new-request-main">
        <div className="back-navigation">
          <span className="material-symbols-outlined">arrow_forward</span>
          <span>חזרה לבקשות</span>
        </div>
        <section className="form-section">
          <div className="form-header">
            <h1>יצירת בקשה חדשה</h1>
            <p>ספרו לנו מה אתם צריכים ואיפה אתם רוצים לקבל את זה.</p>
          </div>
          <form className="request-form">
            <div className="input-group">
              <label htmlFor="product-name">שם המוצר</label>
              <input id="product-name" type="text" placeholder="לדוגמה: אוזניות Sony WH-1000XM5" />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="buy-link">קישור לקנייה (אופציונלי)</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">link</span>
                  <input id="buy-link" type="url" dir="ltr" placeholder="https://amazon.com/..." />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="max-price">תקציב מקסימלי ($)</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">payments</span>
                  <input id="max-price" type="number" placeholder="0.00" />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="destination">יעד למסירה</label>
              <div className="input-with-icon">
                <span className="material-symbols-outlined">location_on</span>
                <input id="destination" type="text" placeholder="עיר, מדינה" />
              </div>
            </div>
            
            <UploadSection />

            <div className="submit-section">
              <button type="submit" className="save-button">
                <span className="material-symbols-outlined">save</span>
                שמירת בקשה
              </button>
              <p className="terms-text">
                בלחיצה על "שמירה", אתם מסכימים ל<a href="#">תנאי השימוש</a> ול<a href="#">כללי הקהילה</a>.
              </p>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
