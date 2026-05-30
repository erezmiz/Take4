import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import UploadSection from '../components/UploadSection';
import './NewRequestPage.css';

export default function NewRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [buyLink, setBuyLink] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [destination, setDestination] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('request-images')
          .upload(path, imageFile);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('request-images')
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }

      const now = new Date().toISOString();
      const { error: insertError } = await supabase.from('requests').insert({
        user_id: user.id,
        title: productName,
        product_url: buyLink || null,
        max_price: maxPrice ? parseFloat(maxPrice) : null,
        destination_country: destination,
        image_url: imageUrl,
        status: 'new',
        created_at: now,
        updated_at: now,
      });
      if (insertError) throw insertError;

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl">

      <main className="new-request-main">
        <div className="back-navigation" onClick={() => navigate('/dashboard')}>
          <span className="material-symbols-outlined">arrow_forward</span>
          <span>חזרה לבקשות</span>
        </div>

        <section className="form-section">
          <div className="form-header">
            <h1>יצירת בקשה חדשה</h1>
            <p>ספרו לנו מה אתם צריכים ואיפה אתם רוצים לקבל את זה.</p>
          </div>

          <form className="request-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="product-name">שם המוצר</label>
              <input
                id="product-name"
                type="text"
                placeholder="לדוגמה: אוזניות Sony WH-1000XM5"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="buy-link">קישור לקנייה (אופציונלי)</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">link</span>
                  <input
                    id="buy-link"
                    type="url"
                    dir="ltr"
                    placeholder="https://amazon.com/..."
                    value={buyLink}
                    onChange={(e) => setBuyLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="max-price">תקציב מקסימלי ($)</label>
                <div className="input-with-icon">
                  <span className="material-symbols-outlined">payments</span>
                  <input
                    id="max-price"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="destination">יעד למסירה</label>
              <div className="input-with-icon">
                <span className="material-symbols-outlined">location_on</span>
                <input
                  id="destination"
                  type="text"
                  placeholder="עיר, מדינה"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
            </div>

            <UploadSection file={imageFile} onFileChange={setImageFile} />

            {error && <p className="form-error">{error}</p>}

            <div className="submit-section">
              <button type="submit" className="save-button" disabled={submitting}>
                <span className="material-symbols-outlined">
                  {submitting ? 'hourglass_empty' : 'save'}
                </span>
                {submitting ? 'שומר...' : 'שמירת בקשה'}
              </button>
              <p className="terms-text">
                בלחיצה על "שמירה", אתם מסכימים ל<a href="#">תנאי השימוש</a> ול<a href="#">כללי הקהילה</a>.
              </p>
            </div>
          </form>
        </section>
      </main>

    </div>
  );
}
