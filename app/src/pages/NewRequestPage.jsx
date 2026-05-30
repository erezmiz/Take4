import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import UploadSection from '../components/UploadSection';
import CitySelect from '../components/CitySelect';
import './NewRequestPage.css';

const SIZE_OPTIONS = [
  { value: 'small',  label: 'קטן' },
  { value: 'medium', label: 'בינוני' },
  { value: 'large',  label: 'גדול' },
];

export default function NewRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [productName,      setProductName]      = useState('');
  const [purchaseCity,     setPurchaseCity]      = useState('');
  const [meetDeliver,      setMeetDeliver]       = useState('');
  const [buyLink,          setBuyLink]           = useState('');
  const [maxPrice,         setMaxPrice]          = useState('');
  const [deliverPay,       setDeliverPay]        = useState('');
  const [isFragile,        setIsFragile]         = useState(false);
  const [packageSize,      setPackageSize]       = useState('');
  const [imageFile,        setImageFile]         = useState(null);
  const [existingImageUrl, setExistingImageUrl]  = useState(null);
  const [loadingData,      setLoadingData]       = useState(isEditMode);
  const [submitting,       setSubmitting]        = useState(false);
  const [error,            setError]             = useState('');

  useEffect(() => {
    if (!isEditMode) return;
    supabase.from('requests').select('*').eq('id', id).single()
      .then(({ data }) => {
        if (data) {
          setProductName(data.title || '');
          setPurchaseCity(data.destination_country || '');
          setMeetDeliver(data.meet_deliver || '');
          setBuyLink(data.product_url || '');
          setMaxPrice(data.max_price != null ? String(data.max_price) : '');
          setDeliverPay(data.deliver_pay != null ? String(data.deliver_pay) : '');
          setIsFragile(data.broken || false);
          setPackageSize(data.size || '');
          setExistingImageUrl(data.image_url || null);
        }
        setLoadingData(false);
      });
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      let imageUrl = existingImageUrl;

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
      const payload = {
        title:              productName,
        destination_country: purchaseCity,
        meet_deliver:       meetDeliver || null,
        product_url:        buyLink || null,
        max_price:          maxPrice ? parseFloat(maxPrice) : null,
        deliver_pay:        deliverPay ? parseFloat(deliverPay) : null,
        broken:             isFragile,
        size:               packageSize || null,
        image_url:          imageUrl,
        updated_at:         now,
      };

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from('requests').update(payload).eq('id', id);
        if (updateError) throw updateError;
        navigate(`/product/${id}`);
      } else {
        const { error: insertError } = await supabase.from('requests').insert({
          ...payload,
          user_id:    user.id,
          status:     'new',
          created_at: now,
        });
        if (insertError) throw insertError;
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div dir="rtl" className="new-request-loading">
        <p>טוען נתונים...</p>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <main className="new-request-main">
        <div
          className="back-navigation"
          onClick={() => navigate(isEditMode ? `/product/${id}` : '/dashboard')}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
          <span>{isEditMode ? 'חזרה לבקשה' : 'חזרה לבקשות'}</span>
        </div>

        <section className="form-section">
          <div className="form-header">
            <h1>{isEditMode ? 'עריכת בקשה' : 'יצירת בקשה חדשה'}</h1>
            <p>ספרו לנו מה אתם צריכים ואיפה אתם רוצים לקבל את זה.</p>
          </div>

          <form className="request-form" onSubmit={handleSubmit}>

            {/* שם המוצר */}
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

            {/* יעד הרכישה */}
            <div className="input-group">
              <label>יעד הרכישה <span className="label-required">*</span></label>
              <CitySelect
                value={purchaseCity}
                onChange={setPurchaseCity}
                placeholder="מהיכן לקנות? חפש עיר..."
              />
            </div>

            {/* יעד מסירה */}
            <div className="input-group">
              <label htmlFor="meet-deliver">יעד למסירה</label>
              <div className="input-with-icon">
                <span className="material-symbols-outlined">location_on</span>
                <input
                  id="meet-deliver"
                  type="text"
                  placeholder="עיר, מדינה"
                  value={meetDeliver}
                  onChange={(e) => setMeetDeliver(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* קישור + תקציב */}
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="buy-link">קישור לקנייה <span className="label-optional">(אופציונלי)</span></label>
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

            {/* תגמול למשלוח */}
            <div className="input-group">
              <label htmlFor="deliver-pay">
                תגמול למשלוח ($) <span className="label-optional">(אופציונלי)</span>
              </label>
              <div className="input-with-icon">
                <span className="material-symbols-outlined">paid</span>
                <input
                  id="deliver-pay"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  value={deliverPay}
                  onChange={(e) => setDeliverPay(e.target.value)}
                />
              </div>
            </div>

            {/* שביר + גודל */}
            <div className="form-grid">
              <div className="input-group">
                <label>האם המוצר שביר?</label>
                <div className="toggle-group">
                  <button
                    type="button"
                    className={`toggle-btn ${isFragile ? 'toggle-btn--active' : ''}`}
                    onClick={() => setIsFragile(true)}
                  >
                    כן
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${!isFragile ? 'toggle-btn--active' : ''}`}
                    onClick={() => setIsFragile(false)}
                  >
                    לא
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label>גודל החבילה <span className="label-optional">(אופציונלי)</span></label>
                <div className="size-group">
                  {SIZE_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      className={`size-btn ${packageSize === value ? 'size-btn--active' : ''}`}
                      onClick={() => setPackageSize(packageSize === value ? '' : value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <UploadSection
              file={imageFile}
              onFileChange={setImageFile}
              existingUrl={existingImageUrl}
            />

            {error && <p className="form-error">{error}</p>}

            <div className="submit-section">
              <button type="submit" className="save-button" disabled={submitting}>
                <span className="material-symbols-outlined">
                  {submitting ? 'hourglass_empty' : isEditMode ? 'update' : 'save'}
                </span>
                {submitting ? 'שומר...' : isEditMode ? 'עדכון בקשה' : 'שמירת בקשה'}
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
