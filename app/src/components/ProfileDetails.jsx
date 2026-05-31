import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './ProfileDetails.css';

// Deterministic pseudo-random from a string seed — same user always gets same value
function seededNumber(seed, min, max, decimals = 0) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const norm = (Math.abs(hash) % 10000) / 9999;
  return parseFloat((min + norm * (max - min)).toFixed(decimals));
}

function formatJoinDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני',
                  'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ProfileDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile,      setProfile]     = useState(null);
  const [dealsCount,   setDealsCount]  = useState(0);
  const [loading,      setLoading]     = useState(true);
  const [confirming,   setConfirming]  = useState(false);
  const [deleting,     setDeleting]    = useState(false);
  const [deleteError,  setDeleteError] = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    async function load() {
      const [{ data: profileData }, { count }] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('deals')
          .select('*', { count: 'exact', head: true })
          .eq('traveler_id', user.id),
      ]);
      setProfile(profileData);
      setDealsCount(count || 0);
      setLoading(false);
    }

    load();
  }, [user]);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.id);
      if (error) throw error;
      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      setDeleteError(err.message || 'שגיאה במחיקה. אנא נסה שנית.');
      setDeleting(false);
      setConfirming(false);
    }
  };

  const trustScore     = useMemo(() => user ? seededNumber(user.id + 't', 87, 98, 0) : 0, [user]);
  const communityScore = useMemo(() => user ? seededNumber(user.id + 'c', 4.1, 4.9, 1) : 0, [user]);

  if (loading) {
    return (
      <section className="profile-details-section">
        <div className="profile-card profile-card--loading">
          <p>טוען פרופיל...</p>
        </div>
      </section>
    );
  }

  const name   = profile?.title || profile?.full_name || user?.email?.split('@')[0] || 'משתמש';
  const avatar = profile?.image_url || profile?.profile_image_url || null;
  const joined = formatJoinDate(profile?.created_at);

  return (
    <section className="profile-details-section">
      <div className="profile-card">

        <div className="avatar-container">
          {avatar ? (
            <img src={avatar} alt={name} className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="verified-badge">
            <span className="material-symbols-outlined">verified</span>
          </div>
        </div>

        <div className="details-text">
          <h1>{name}</h1>
          <p>
            {user?.email}
            {joined && <> • הצטרף ב{joined}</>}
          </p>
          <div className="stats">
            <div className="stat-item">
              <span>מדד אמון</span>
              <strong>{trustScore}%</strong>
            </div>
            <div className="stat-item">
              <span>עסקאות</span>
              <strong>{dealsCount} עסקאות</strong>
            </div>
            <div className="stat-item">
              <span>קהילה</span>
              <strong>{communityScore} ★</strong>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>ערוך פרופיל</button>
          <button className="delete-account-btn" onClick={() => setConfirming(true)}>
            מחיקת חשבון
          </button>
        </div>

      </div>

      {confirming && (
        <div className="delete-account-confirm">
          <p className="delete-account-confirm-text">
            האם למחוק את החשבון? פעולה זו תמחק את נתוני הפרופיל ולא ניתנת לביטול.
          </p>
          {deleteError && <p className="delete-account-error">{deleteError}</p>}
          <div className="delete-account-confirm-actions">
            <button
              className="delete-confirm-yes"
              onClick={handleDeleteAccount}
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

    </section>
  );
}
