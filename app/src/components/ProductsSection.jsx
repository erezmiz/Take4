import ProductCard from './ProductCard';
import './ProductsSection.css';

export default function ProductsSection() {
  const products = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3x5CGna16BKbF0PH6SE5aMkniV67J5JbfG60g1OhGN_9fu_HGsVzcNSmXxn3FOAajW6BRTytWRwT-OPe5mtYiLd6cY3aI6S8vmp4_5Vt3iCdPPwDeDs6nyhgdVioDKOUdp4XKCcL53FHJJkshqsVOzIpjhT1UjM9bWrqUXD9wHqdbVQ1YxNBGlDaMQK-ThMezCsRzD3kg-2g_SL2jEfB0BrZZkE94C7pVDn70Sd1rQQVu8b9jkVUBmcr1caz_o2LMF_CKynVZfRFr',
      title: 'Apple Watch Series 9',
      country: 'ארה״ב',
      origin: 'ניו יורק',
      destination: 'לונדון',
      reward: 45,
      badges: [{ type: 'fragile', label: 'שביר', icon: '⚠️' }]
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWKvsIV2rptbf-dglPthpH1XrHfSX09nrFuyuRtUd3HXR4snMBbRGOsPJY0L2iaZ4Z2obp17UYY3Ma1yYft-AWLV16XGlUuB19YEQYX5qbr4SPm1Qh_gUy31-pFoMpIpZJTwpq8kCY_nXwur65Ss38O3Lcd7Nf2R-hCS-chtRYaCm9xHWGe1vNKr3cdoTyceIOp8gFG0anOZRaWjzUXxYljg4buLsWJRW1KIBrCjd1M7MYJOGuYvU-VgVcTrJ0sg5xpXvd_ok_Vpte',
      title: 'נעליים במהדורה מוגבלת',
      country: 'צרפת',
      origin: 'פריז',
      destination: 'טוקיו',
      reward: 60,
      badges: []
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq0hXfD9GbColQ-KVgUsnrr8udFrdGfQHm5RiS3xttPSs9fGqOQiQsJ27PoWHiF2srKRp6Um6uJkfbKNCFAzmus1QD1-7ktNvoHAHPBesQLiEK1evx5i2Y4siU1dlyGye9DwoDJxTGTms9PtKky9_lwTq8KK8_hxdLRB-KzvM7tm_4iYak8SMbQ_O9BB-O-GyQx-Tuord7UmdTFiBeroysd5xgbifTkHQJQYgmPgcH3GHj_VDr2DvwD5G8F7F8e7Bk0EVHbkLXJPlU',
      title: 'אוזניות Sony XM5',
      country: 'גרמניה',
      origin: 'ברלין',
      destination: 'דובאי',
      reward: 35,
      badges: [{ type: 'large', label: 'גדול', icon: '📦' }]
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpbnJwLAxGkPLVPpjPGpbO0eOBpGAxUz-qUTb24-7_I7DDpGl-wZMaPFh4EeQjDLuET5QyHunoqv3QvnrdEjxVuNx5IkD-x4NNQuR2hIyLl1WG5uDgVeEeaasIMnqIxRu91jGqwPV6GbmUYdKkRfcDfpw5eWhd4iVOvaC06-yhGB-zgbpMG5sz0eH8dSfww30NSmQPMo9prJe_YgT0vjQ7MrKhCPFD8zhimXWAWBd4WOhCWv1M3xBeqN1eR2uvzJpR3qn0rY8GjSuv',
      title: 'סט טיפוח Tatcha Dewy',
      country: 'יפן',
      origin: 'טוקיו',
      destination: 'סידני',
      reward: 25,
      badges: []
    }
  ];

  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <h2 className="products-title">בקשות פופולריות</h2>
          <p className="products-subtitle">עזרו לאחרים והרוויחו תגמולים בטיול הבא שלכם</p>
        </div>
        <button className="view-all-btn">
          צפה בהכל <span className="arrow">→</span>
        </button>
      </div>
      <div className="products-grid">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            image={product.image}
            title={product.title}
            country={product.country}
            origin={product.origin}
            destination={product.destination}
            reward={product.reward}
            badges={product.badges}
          />
        ))}
      </div>
    </section>
  );
}
