import './StatusProduct.css';

export default function StatusProduct() {
  return (
    <div className="status-container">
      <div className="status-header">
        <h3 className="status-title">פרטי הנסיעה</h3>
        <span className="status-badge">זמין כעת</span>
      </div>
      <div className="status-body">
        <div className="route-visual">
          <div className="dot start"></div>
          <div className="line"></div>
          <div className="dot end"></div>
        </div>
        <div className="route-details">
          <div className="location-info">
            <p className="location-label">איסוף מ</p>
            <p className="location-name">מילאנו, לומברדיה - איטליה</p>
          </div>
          <div className="location-info">
            <p className="location-label">משלוח אל</p>
            <p className="location-name">דובאי בינלאומי (DXB) - איחוד האמירויות</p>
          </div>
        </div>
        <div className="map-preview">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjXdqXYFfl5rCM7T_pmfNDe8q8t_joMXdbFd0LZjdLcrbyn-CW6R0_HVG-tWpKPQHnzcxqoXrUCv0qV9PbGmi9we-QHP3y83vowsYUwPnX7iWe0zeaQqmxwEWRaUP4kM59BMDYSSSuRvjCYHdKSzcq-iejbEpa8JCwSrw-hDZIkYZ6SJFi2eennLbFx-PBDiT3ldJg9HdOEQ-ZKo1LshAjLJwci6DqHeEBaG0SdzhJILWuu8piSRpS-FZvFKhSKKk8wBFoAiWrJvts" alt="Dubai Skyline Map" />
        </div>
      </div>
    </div>
  );
}
