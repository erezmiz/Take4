import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import './EditProfilePage.css';

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName,         setFullName]         = useState('');
  const [imageFile,        setImageFile]         = useState(null);
  const [existingImageUrl, setExistingImageUrl]  = useState(null);
  const [previewUrl,       setPreviewUrl]        = useState(null);
  const [loading,          setLoading]           = useState(true);
  const [saving,           setSaving]            = useState(false);
  const [error,            setError]             = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from('profiles')
      .select('full_name, profile_image_url')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setFullName(data.full_name || '');
          setExistingImageUrl(data.profile_image_url || null);
          setPreviewUrl(data.profile_image_url || null);
        }
        setLoading(false);
      });
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let imageUrl = existingImageUrl;

      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const path = `${user.id}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(path, imageFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('profile-images')
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name:         fullName,
          profile_image_url: imageUrl,
          updated_at:        new Date().toISOString(),
        })
        .eq('user_id', user.id);
      if (updateError) throw updateError;

      navigate('/profile');
    } catch (err) {
      setError(err.message || 'אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="edit-profile-loading">
        <p>טוען...</p>
      </div>
    );
  }

  const initials = fullName.trim().charAt(0).toUpperCase() || '?';

  return (
    <div dir="rtl">
      <main className="edit-profile-main">

        <button className="back-btn" onClick={() => navigate('/profile')}>
          <span className="back-chevron" />
          חזרה לפרופיל
        </button>

        <section className="edit-profile-card">
          <div className="edit-profile-header">
            <h1>עריכת פרופיל</h1>
            <p>עדכנו את פרטי הפרופיל שלכם</p>
          </div>

          <form className="edit-profile-form" onSubmit={handleSubmit}>

            {/* תמונת פרופיל */}
            <div className="avatar-upload-section">
              <label className="avatar-upload-label" htmlFor="avatar-input">
                <div className="avatar-preview">
                  {previewUrl ? (
                    <img src={previewUrl} alt="תמונת פרופיל" />
                  ) : (
                    <span className="avatar-initials">{initials}</span>
                  )}
                  <div className="avatar-overlay">
                    <span className="avatar-camera">📷</span>
                    <span className="avatar-overlay-text">שנה תמונה</span>
                  </div>
                </div>
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="avatar-file-input"
              />
              {imageFile && (
                <p className="avatar-filename">{imageFile.name}</p>
              )}
              <p className="avatar-hint">לחצו על התמונה להחלפה • PNG, JPG או WEBP עד 5MB</p>
            </div>

            {/* שם מלא */}
            <div className="edit-field">
              <label htmlFor="full-name">שם מלא</label>
              <input
                id="full-name"
                type="text"
                className="edit-input"
                placeholder="הזינו את שמכם המלא"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* דוא"ל — לקריאה בלבד */}
            <div className="edit-field">
              <label>דוא"ל</label>
              <input
                type="email"
                className="edit-input edit-input--readonly"
                value={user?.email || ''}
                disabled
                dir="ltr"
              />
              <p className="field-hint">לא ניתן לשנות את כתובת הדוא"ל</p>
            </div>

            {error && <p className="edit-error">{error}</p>}

            <div className="edit-actions">
              <button type="submit" className="save-profile-btn" disabled={saving}>
                {saving ? 'שומר...' : 'שמור שינויים'}
              </button>
              <button
                type="button"
                className="cancel-profile-btn"
                onClick={() => navigate('/profile')}
                disabled={saving}
              >
                ביטול
              </button>
            </div>

          </form>
        </section>
      </main>
    </div>
  );
}
