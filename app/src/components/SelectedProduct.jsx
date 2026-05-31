import { useNavigate } from 'react-router-dom';
import './SelectedProduct.css';

export default function SelectedProduct({ deal }) {
  const navigate = useNavigate();
  const { name, from, to, price, status, imageUrl, requestId } = deal;

  const getStatusWidth = () => {
    switch (status) {
      case 'ממתין': return '25%';
      case 'שולם (נאמנות)': return '50%';
      case 'נרכש': return '75%';
      case 'נמסר': return '100%';
      default: return '0%';
    }
  };

  return (
    <div
      className="deal-card"
      onClick={() => requestId && navigate(`/product/${requestId}`)}
      style={{ cursor: requestId ? 'pointer' : 'default' }}
    >
      <div className="deal-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="deal-image" />
        ) : (
          <div className="deal-image-placeholder">{name.charAt(0)}</div>
        )}
      </div>
      <div className="deal-details">
        <div className="deal-header">
          <div>
            <h3>{name}</h3>
            <p>מ: {from} • אל: {to}</p>
          </div>
          <span className="deal-price">${price}</span>
        </div>
        <div className="progress-stepper">
          <div className="step-labels">
            <span className={status === 'ממתין' || status === 'שולם (נאמנות)' || status === 'נרכש' || status === 'נמסר' ? 'active' : ''}>ממתין</span>
            <span className={status === 'שולם (נאמנות)' || status === 'נרכש' || status === 'נמסר' ? 'active' : ''}>שולם (נאמנות)</span>
            <span className={status === 'נרכש' || status === 'נמסר' ? 'active' : ''}>נרכש</span>
            <span className={status === 'נמסר' ? 'active' : ''}>נמסר</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: getStatusWidth() }}></div>
          </div>
        </div>
      </div>
      <div className="deal-action">
        {status === 'נמסר' ? (
          <button className="confirm-btn">אשר קבלה</button>
        ) : status === 'נרכש' ? (
            <button className="confirm-btn disabled" disabled>אשר קבלה</button>
        ) : (
          <div className="pending-purchase">ממתין לאישור רכישה מהמוביל</div>
        )}
      </div>
    </div>
  );
}
