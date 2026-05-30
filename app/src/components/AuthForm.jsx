import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './AuthForm.css';

export default function AuthForm({ onSuccess }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const switchTab = (t) => {
    setTab(t);
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        onSuccess?.();
      } else {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (err) throw err;
        onSuccess?.();
      }
    } catch (err) {
      if (tab === 'login') {
        setError('דוא"ל או סיסמה שגויים');
      } else {
        setError(err.message || 'אירעה שגיאה. אנא נסה שנית.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-header">
        <h2 className="auth-form-title">ברוכים הבאים ל-BringIt</h2>
        <p className="auth-form-subtitle">
          {tab === 'login' ? 'היכנסו לחשבון שלכם' : 'צרו חשבון חדש והצטרפו לקהילה'}
        </p>
      </div>

      <div className="auth-form-tabs">
        <button
          type="button"
          className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
          onClick={() => switchTab('login')}
        >
          התחבר
        </button>
        <button
          type="button"
          className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
          onClick={() => switchTab('register')}
        >
          הרשמה
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {tab === 'register' && (
          <div className="auth-field">
            <label className="auth-label">שם מלא</label>
            <input
              type="text"
              className="auth-input"
              placeholder="הזינו את שמכם המלא"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className="auth-field">
          <label className="auth-label">דוא"ל</label>
          <input
            type="email"
            className="auth-input auth-input-ltr"
            placeholder='הזינו כתובת דוא"ל'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="auth-field">
          <label className="auth-label">סיסמה</label>
          <input
            type="password"
            className="auth-input auth-input-ltr"
            placeholder="הזינו סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}
        {successMsg && <p className="auth-success">{successMsg}</p>}

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? 'אנא המתן...' : tab === 'login' ? 'כניסה' : 'הרשמה'}
        </button>
      </form>
    </div>
  );
}
