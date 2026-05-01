import './ImageGallery.css';

export default function ImageGallery() {
  const mainImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBr-stN7Bg0Y3omRAZUm6uk9Qsm3Nhv8WcDILmpM6EDOGrUGZfG3F0bb-PAFmRb0hrGqk9zxuKmoSrep7zb39vJ_u0k05iOtdN1Xa1b3wTlDBQ-KVjYLZbYwDCQ4-kRCgoPSvNYN7CwxyAJycl5cyNAbaK6YJHDUNV5OgS5GgFZbgXwPMS1uwjPH_0XSwZBaURmp-ZcbbQqzv6ICLdGUAf2P53XCUkm-SCue76lGGQIgYNxQ4Otcfo3x66dNrUzSsetORZlT2PdskmQ";
  const galleryImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAq36NYAXkd5IFxeCYM52NFCcaonF1OWdPX3KSdLpM-RjvWL2KcCwV0avuPUIEtTZ5q2zgr3XpLt1M2izs-UOKQxG-bMWz6cRQ3m27MbJzbYsTnMF95gj24f-PkohNx_bKWNDPSyVip9XyZz4ALHtcA5Em7ct8xPT9404rhIEokvWQVNfygaK7-9K_xutqU09n1wjUe2WQXitZsRMKSp8i9I2hxb3gkEDdF5wpuAtdpuISzpTq3_h__QZi05J_BqJynHs76aXKyX0bB",
    "https.googleusercontent.com/aida-public/AB6AXuBkJQfSteyPAXxXHpoTTVukmNb9f4N_g5uALib96KJbLl_HfSWyD2dOJAlnRxpEpEkgRV2fLsUsxv5X1OP9E9HykBZ7c_qCJjQQqqzYReYvgE6qz5fjUhdRUU9r3qe9cnN-A1-a9eOCB_xqSQ3ketvF1qSeTpfSVsrFnwMASuUpkvwglevuUoYCHCGg7mb05_d0ufEW9eF3jPie7XGVfJj5ZPHUQc56IuG6kcXJqZhzza4ClhuLoF7fqvQgILmnzkam_O5xjPbSHwXX",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2OiJL20WFdxu1p8kpWg8eofaYb4KMxlPwNE3nxFp28Sol3eUI6bgCDNFZgO3gGzoDA1kbFWcYyHtS6oYYKOmlKB6Gy-QVD8_SWh1HzN1y7MskiighGLeYnHdSyEN-si08Ji1k-hPxP-LTnJ-Jryb8ewIio5wz942BLXoZZEZ4cN57pS0Tr9376cYxeYal1D62wCFzvO1zot_LmDetpvatgEbwR4yZVKODgswM4xqmsdbyGxf7HLkQmp19jW0L31TUPgd1HPomfORZ",
  ];

  return (
    <div className="image-gallery-container">
      <div className="main-image-wrapper">
        <img src={mainImage} alt="Brezza Pro Espresso Machine" className="main-image" />
        <div className="image-actions">
          <button className="image-action-btn">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <button className="image-action-btn">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
      <div className="thumbnail-grid">
        {galleryImages.map((img, index) => (
          <div key={index} className="thumbnail-wrapper">
            <img src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail-image" />
            {index === galleryImages.length - 1 && (
              <div className="thumbnail-overlay">
                +2
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
