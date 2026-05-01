import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import ProductDetails from '../components/ProductDetails';
import StatusProduct from '../components/StatusProduct';
import './ProductPage.css';

export default function ProductPage({ onNavigate }) {
  return (
    <div dir="rtl">
      <Navbar onNavigate={onNavigate} />
      <main className="product-page-main">
        <div className="breadcrumb">
          <span className="material-symbols-outlined">arrow_forward</span>
          <span>חזרה לבקשות</span>
        </div>
        <div className="product-grid">
          <div className="gallery-column">
            <ImageGallery />
          </div>
          <div className="details-column">
            <ProductDetails />
            <StatusProduct />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
