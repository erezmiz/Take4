import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ChatPage.css';

export default function ChatPage({ onNavigate }) {
  return (
    <div dir="rtl">
      <Navbar onNavigate={onNavigate} />
      <main className="chat-main">
        <div className="transaction-banner">
          <div className="banner-content">
            <div className="banner-icon">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div>
              <h3>מוכנים לאבטח את הפריט?</h3>
              <p>הכספים יוחזקו בבטחה עד לאישור המסירה.</p>
            </div>
          </div>
          <button className="escrow-button">המשך לתשלום נאמנות</button>
        </div>
        
        <div className="chat-container">
          <div className="date-divider">
            <span>היום, 24 באוקטובר</span>
          </div>

          <div className="message-group partner">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNI1RfwoR_pjms1JMyx5gBsXWd-eB5UHO5QALJbd2Zsm7QfBGxTOJCUyqTs2S6_ukLjNXOY6yuQfkC4MPX7LGTdtI2hi8gSqWxhAQSwG-oLbmerSN98uJxqN5yuwOMEfUbhF_rhI18mH6ZLXVKJnw66nYgn-asp56_SHRE2RPSUCfvWWB8VMrgd9_TFhExZrrL7jwjiguwqE_QQZmb8COHZ01sP1uGcvbr5Dg08NDQ0wgctYEMUaVV1_-tLChGQ8nL3EI2vWvfQM1l" alt="מרקוס" className="avatar" />
            <div className="message-content">
              <div className="bubble partner">
                היי! שמתי לב לבקשה שלך למצלמת הוינטג' מטוקיו. אני חוזר ביום ראשון הקרוב ויכול לאסוף אותה בשבילך.
              </div>
              <span className="timestamp">09:41 AM</span>
            </div>
          </div>

          <div className="item-card-wrapper">
            <div className="item-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLRw1j_cfO2ZJ00IsGWvj93SVELXo2mxvO_vb-5Admz7_nUIz1vA37iFdAXAIhT0q7Vn4LZBXVC2fAJO8sqmMYqh7TTyTpAc6k-eAwEN_SccogbaAFgagRW16iYHqzPLbP2rtG8KEjWzPKFgDvCrLshqmNgzRDvOPrtZjlT1A34KDlizhpR7Das5EfHDiOx8byj3NLtzlm057rcDZFyodJVkM_ZlD54PQD8B9tyTnakXPYG3EBBbBauCVmo76K87i3y4VnrXedHj_S" alt="מצלמה" className="item-image" />
              <div className="item-details">
                <p className="item-name">Fujifilm X100V - כסוף</p>
                <p className="item-location">איסוף מ: שיבויה, טוקיו</p>
                <div className="item-footer">
                  <span className="item-price">$1,200.00</span>
                  <span className="item-link">קישור לפריט</span>
                </div>
              </div>
            </div>
          </div>

          <div className="message-group user">
            <div className="message-content">
              <div className="bubble user">
                זה יהיה מדהים! ראית את המיקום הספציפי של החנות שציינתי? זה ליד פסל האצ'יקו.
              </div>
              <div className="timestamp-status">
                <span className="timestamp">09:45 AM</span>
                <span className="material-symbols-outlined status-icon">done_all</span>
              </div>
            </div>
          </div>
          
          {/* More messages here */}
          
        </div>

        <div className="chat-input-bar">
            <button className="icon-button"><span className="material-symbols-outlined">add_circle</span></button>
            <button className="icon-button"><span className="material-symbols-outlined">image</span></button>
            <div className="input-wrapper">
                <input type="text" placeholder="הקלד הודעה..." />
                <button className="icon-button emoji-button"><span className="material-symbols-outlined">mood</span></button>
            </div>
            <button className="send-button"><span className="material-symbols-outlined">send</span></button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
