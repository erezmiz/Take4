import { useState } from 'react';
import './SearchProduct.css';

export default function SearchProduct() {
  const [searchText, setSearchText] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState(['ניו יורק']);
  const [minReward, setMinReward] = useState('הכל');
  const [itemSize, setItemSize] = useState('קטן');
  const [isFragile, setIsFragile] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const removeDestination = (dest) => {
    setSelectedDestinations(prev => prev.filter(d => d !== dest));
  };

  const handleSearch = () => {
    console.log({ selectedDestinations, minReward, itemSize, isFragile });
  };

  return (
    <div className="search-section">
      <div className="hero-image">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9dX2oJhxUo1WJCkI35eh6yq9VBagJHYVu_z6_VGppXQK-aaI9-JBaMCmbSLanfEepEzUJq_1hIkw4R362ecSpZI9nWHGTFV9yAuuLTn6PODfhPWFIGgfoIgBaTTEWPBIFdL5uJ7o_iT3UtVpteAB8m8PlmzL08rlfkbDZ4kAP3jt4_sx0I7mnAcKrLsSaWGtgDQfJn13-ZWC2i0orgky8h_OqqZVRsVBqBYvTvAoDvdbm9ibb3RfxZC_HL-8x3XLqvRUIxfNpt2J_"
          alt="Travel background"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">הרוויחו כסף מהמקום הפנוי במזוודה</h1>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <button className="hide-filters-btn" onClick={() => setShowFilters(!showFilters)}>
            <span className="hide-filters-icon">✕</span>
            {showFilters ? 'הסתר פילטרים' : 'הצג פילטרים'}
          </button>
          
          <div className="search-main">
            <label className="search-label">יעדים</label>
            <div className="destinations-input">
              {selectedDestinations.map((dest, idx) => (
                <div key={idx} className="destination-tag">
                  {dest}
                  <button 
                    className="remove-btn"
                    onClick={() => removeDestination(dest)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="search-input"
                placeholder="חפשו לפי מדינה, עיר או מספר יעדים..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <button className="search-icon-btn" onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {showFilters && (
          <div className="filter-bar">
            <div className="filter-group">
              <label className="filter-label">גודל פריט</label>
              <div className="size-buttons">
                {['גדול', 'בינוני', 'קטן'].map(size => (
                  <button
                    key={size}
                    className={`size-btn ${itemSize === size ? 'active' : ''}`}
                    onClick={() => setItemSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">תגמול (מינימום)</label>
              <select 
                className="filter-select"
                value={minReward}
                onChange={(e) => setMinReward(e.target.value)}
              >
                <option>הכל</option>
                <option>$20+</option>
                <option>$50+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">שביר</label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={isFragile}
                  onChange={(e) => setIsFragile(e.target.checked)}
                  className="toggle-input"
                />
                <div className="toggle-switch"></div>
              </label>
            </div>

            <button className="reset-btn">איפוס פילטרים</button>
          </div>
        )}
      </div>
    </div>
  );
}

