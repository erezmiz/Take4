import './ActionCard.css';

export default function ActionCard({ title, description, buttonText, backgroundImage, onButtonClick }) {
  return (
    <div className="action-card" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="action-card-overlay"></div>
      <div className="action-card-content">
        <h3 className="action-card-title">{title}</h3>
        <p className="action-card-description">{description}</p>
        <button className="action-card-button" onClick={onButtonClick}>{buttonText}</button>
      </div>
    </div>
  );
}
