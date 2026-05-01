import './ChatPage.css';

export default function ChatPage() {
  return (
    <div dir="rtl">
      <main className="chat-main">
        {/* Transaction Banner */}
        <div className="transaction-banner">
          <div className="banner-content-wrapper">
            <div className="banner-text-content">
              <div className="banner-icon-container">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <div>
                <h3>מוכנים לאבטח את הפריט?</h3>
                <p>הכספים יוחזקו בבטחה עד לאישור המסירה.</p>
              </div>
            </div>
            <button className="escrow-button">המשך לתשלום נאמנות</button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="date-divider"><span>היום, 24 באוקטובר</span></div>

          {/* Partner Message */}
          <div className="message-group partner">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNI1RfwoR_pjms1JMyx5gBsXWd-eB5UHO5QALJbd2Zsm7QfBGxTOJCUyqTs2S6_ukLjNXOY6yuQfkC4MPX7LGTdtI2hi8gSqWxhAQSwG-oLbmerSN98uJxqN5yuwOMEfUbhF_rhI18mH6ZLXVKJnw66nYgn-asp56_SHRE2RPSUCfvWWB8VMrgd9_TFhExZrrL7jwjiguwqE_QQZmb8COHZ01sP1uGcvbr5Dg08NDQ0wgctYEMUaVV1_-tLChGQ8nL3EI2vWvfQM1l" alt="מרקוס" className="avatar" />
            <div className="message-content">
              <div className="bubble partner">
                היי! שמתי לב לבקשה שלך למצלמת הוינטג' מטוקיו. אני חוזר ביום ראשון הקרוב ויכול לאסוף אותה בשבילך.
              </div>
              <span className="timestamp">09:41 AM</span>
            </div>
          </div>

          {/* Item Card */}
          <div className="item-card-wrapper">
            <div className="item-card">
              <div className="item-image-container">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLRw1j_cfO2ZJ00IsGWvj93SVELXo2mxvO_vb-5Admz7_nUIz1vA37iFdAXAIhT0q7Vn4LZBXVC2fAJO8sqmMYqh7TTyTpAc6k-eAwEN_SccogbaAFgagRW16iYHqzPLbP2rtG8KEjWzPKFgDvCrLshqmNgzRDvOPrtZjlT1A34KDlizhpR7Das5EfHDiOx8byj3NLtzlm057rcDZFyodJVkM_ZlD54PQD8B9tyTnakXPYG3EBBbBauCVmo76K87i3y4VnrXedHj_S" alt="מצלמה" className="item-image" />
              </div>
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

          {/* User Message */}
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
          
          {/* Partner Message */}
          <div className="message-group partner">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUvVKE8HYfFQpWKzkAVicuCCa3wNyEx7PxaDSlAI1k-JTWQyad85huH-f_V6VINoB2Ptl0Z4iqxfrW6t0M1T0NLBpvJ97yzwyJ6Te2QAsQa9ynTwMhYDigAvmvJZDcp_Xt4gYssTiUSynV3pxfSfY9uZm3SLj8ZAfMo9p4Y863tTtsbPqwrEvrJwXvCPxBF9MzQn68lkqGHvC_-jumWLrdYXStGbCMTjXBD00rFSu-Ja2aqwr-sboDlNLidBpGJ5rcgOuDrng4ZCZ8" alt="מרקוס" className="avatar" />
            <div className="message-content">
              <div className="bubble partner">
                כן, Bic Camera Shibuya! אני מכיר אותה טוב. אני יכול ללכת לשם בשישי בערב. דמי המשלוח של $50 מתאימים לי.
              </div>
              <span className="timestamp">09:47 AM</span>
            </div>
          </div>

          {/* User Message */}
          <div className="message-group user">
            <div className="message-content">
              <div className="bubble user">
                מעולה. אני אגש לבצע את תשלום הנאמנות עכשיו כדי שיהיה לך אישור לפני שאתה יוצא.
              </div>
              <div className="timestamp-status">
                <span className="timestamp">09:50 AM</span>
                <span className="material-symbols-outlined status-icon">done_all</span>
              </div>
            </div>
          </div>

          {/* System Message */}
          <div className="system-message-container">
            <div className="system-message">
              <span className="material-symbols-outlined">info</span>
              <p>שמור את התשלומים שלך בתוך BringIt להגנה.</p>
            </div>
          </div>

        </div>

        {/* Chat Input Bar */}
        <div className="chat-input-bar">
          <button className="icon-button"><span className="material-symbols-outlined">add_circle</span></button>
          <button className="icon-button"><span className="material-symbols-outlined">image</span></button>
          <div className="input-wrapper">
            <input type="text" placeholder="הקלד הודעה..." />
            <button className="icon-button emoji-button"><span className="material-symbols-outlined">mood</span></button>
          </div>
          <button className="send-button">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </main>
    </div>
  );
}

