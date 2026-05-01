import './ProfileDetails.css';

export default function ProfileDetails() {
  return (
    <section className="profile-details-section">
      <div className="profile-card">
        <div className="avatar-container">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsw1lEnwrxEpASaV0knOtOImg0UU8wpFt5Vi6ghKH_n7p2trxXKQVnErRt_Eo8Xe2TGlt5Q93Kqf-azq_WUuXuoF8QPyHcxTNYJga7Lbw0uI7i6b5SmhXUgQLvW9xfZst41ro11x-_Uz7SAfWqQ06vU-5rcWlu-yZB6SH0A4sxNvL9W5SA3J2z2WZBlLvqYcNE05qwYiHTt4cvn4pl0O9dZOeyCI9rsags15PnF9lc9QgBqT0T92AcG5apMcC2GHgQtbT0nTpUtrFo" 
            alt="אלכס הנדרסון" 
            className="avatar-image" 
          />
          <div className="verified-badge">
            <span className="material-symbols-outlined">verified</span>
          </div>
        </div>
        <div className="details-text">
          <h1>אלכס הנדרסון</h1>
          <p>חבר דרגת כסף • הצטרף באוקטובר 2023</p>
          <div className="stats">
            <div className="stat-item">
              <span>מדד אמון</span>
              <strong>98%</strong>
            </div>
            <div className="stat-item">
              <span>עסקאות</span>
              <strong>24 עסקאות</strong>
            </div>
            <div className="stat-item">
              <span>קהילה</span>
              <strong>4.9 ★</strong>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-profile-btn">ערוך פרופיל</button>
          <button className="settings-btn">
            <span className="material-symbols-outlined">settings</span>
            הגדרות חשבון
          </button>
        </div>
      </div>
    </section>
  );
}
