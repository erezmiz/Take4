
export default function ProductPage() {
  return (
    <div dir="rtl">
      
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
      
    </div>
  );
}
