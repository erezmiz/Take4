import './ImageGallery.css';

const PLACEHOLDER = "https://lh3.googleusercontent.com/aida-public/AB6AXuBr-stN7Bg0Y3omRAZUm6uk9Qsm3Nhv8WcDILmpM6EDOGrUGZfG3F0bb-PAFmRb0hrGqk9zxuKmoSrep7zb39vJ_u0k05iOtdN1Xa1b3wTlDBQ-KVjYLZbYwDCQ4-kRCgoPSvNYN7CwxyAJycl5cyNAbaK6YJHDUNV5OgS5GgFZbgXwPMS1uwjPH_0XSwZBaURmp-ZcbbQqzv6ICLdGUAf2P53XCUkm-SCue76lGGQIgYNxQ4Otcfo3x66dNrUzSsetORZlT2PdskmQ";

export default function ImageGallery({ imageUrl, title }) {
  const mainImage = imageUrl || PLACEHOLDER;

  return (
    <div className="image-gallery-container">
      <div className="main-image-wrapper">
        <img src={mainImage} alt={title || 'תמונת מוצר'} className="main-image" />
        <div className="image-actions">
          <button className="image-action-btn">
            <span className="action-label">↗ שתף</span>
          </button>
          <button className="image-action-btn">
            <span className="action-label">♡ שמור</span>
          </button>
        </div>
      </div>
    </div>
  );
}
