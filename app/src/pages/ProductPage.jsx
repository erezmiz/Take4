import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import ImageGallery from '../components/ImageGallery';
import ProductDetails from '../components/ProductDetails';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRequest() {
      const { data, error: err } = await supabase
        .from('requests')
        .select('*')
        .eq('id', id)
        .single();

      if (err) setError(err.message);
      else setRequest(data);
      setLoading(false);
    }

    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <div className="product-page-state" dir="rtl">
        <p>טוען בקשה...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="product-page-state product-page-state--error" dir="rtl">
        <p>הבקשה לא נמצאה</p>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <main className="product-page-main">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <span className="back-chevron" />
          חזרה לבקשות
        </button>
        <div className="product-grid">
          <div className="details-column">
            <ProductDetails
              request={request}
              isOwner={user?.id === request.user_id}
            />
          </div>
          <div className="gallery-column">
            <ImageGallery imageUrl={request.image_url} title={request.title} />
          </div>
        </div>
      </main>
    </div>
  );
}
