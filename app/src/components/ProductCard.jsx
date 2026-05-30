import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({
  id,
  image,
  title,
  origin,
  destination,
  reward,
  country,
  badges
}) {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="product-image">
        <img src={image} alt={title} />
        <div className="product-badges">
          <div className="country-badge">{country}</div>
          {badges && badges.map((badge, idx) => (
            <div key={idx} className={`product-badge badge-${badge.type}`}>
              {badge.icon && <span className="badge-icon">{badge.icon}</span>}
              {badge.label}
            </div>
          ))}
        </div>
      </div>
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <div className="product-route">
          <span className="route-icon">📍</span>
          <span>{origin} ← {destination}</span>
        </div>
        <div className="product-footer">
          <div className="reward-section">
            <span className="reward-label">תגמול מוערך</span>
            <span className="reward-value">${reward.toFixed(2)}</span>
          </div>
          <button className="add-button">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
