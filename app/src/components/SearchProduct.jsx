import { useState } from 'react';
import './SearchProduct.css';

const SIZE_OPTIONS  = ['גדול', 'בינוני', 'קטן'];
const REWARD_OPTIONS = ['הכל', '$20+', '$50+', '$100+'];
const SIZE_MAP = { 'גדול': 'large', 'בינוני': 'medium', 'קטן': 'small' };
const SIZE_LABEL = { large: 'גדול', medium: 'בינוני', small: 'קטן' };

export default function SearchProduct({ filters, onFiltersChange, initialFilters }) {
  const [inputText,   setInputText]   = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const update = (patch) => onFiltersChange({ ...filters, ...patch });

  const addDestination = () => {
    const val = inputText.trim();
    if (!val || filters.destinations.includes(val)) { setInputText(''); return; }
    update({ destinations: [...filters.destinations, val] });
    setInputText('');
  };

  const removeDestination = (dest) =>
    update({ destinations: filters.destinations.filter((d) => d !== dest) });

  const toggleSize = (hebrewSize) => {
    const dbVal = SIZE_MAP[hebrewSize];
    update({ size: filters.size === dbVal ? '' : dbVal });
  };

  const resetFilters = () => {
    onFiltersChange({ ...initialFilters });
    setInputText('');
  };

  const activeFilterCount = [
    filters.destinations.length > 0,
    filters.minReward !== 'הכל',
    filters.size !== '',
    filters.fragile,
  ].filter(Boolean).length;

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
          <button
            className="hide-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="hide-filters-icon">✕</span>
            {showFilters ? 'הסתר פילטרים' : `הצג פילטרים${activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}`}
          </button>

          <div className="search-main">
            <label className="search-label">יעדים</label>
            <div className="destinations-input">
              {filters.destinations.map((dest) => (
                <div key={dest} className="destination-tag">
                  {dest}
                  <button className="remove-btn" onClick={() => removeDestination(dest)}>✕</button>
                </div>
              ))}
              <input
                type="text"
                className="search-input"
                placeholder="חפשו לפי מדינה, עיר או מספר יעדים..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addDestination()}
              />
            </div>
          </div>

          <button className="search-icon-btn" onClick={addDestination}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {showFilters && (
          <div className="filter-bar">
            <div className="filter-group">
              <label className="filter-label">גודל פריט</label>
              <div className="size-buttons">
                {SIZE_OPTIONS.map((label) => (
                  <button
                    key={label}
                    className={`size-btn ${filters.size === SIZE_MAP[label] ? 'active' : ''}`}
                    onClick={() => toggleSize(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">תגמול (מינימום)</label>
              <select
                className="filter-select"
                value={filters.minReward}
                onChange={(e) => update({ minReward: e.target.value })}
              >
                {REWARD_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">שביר</label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={filters.fragile}
                  onChange={(e) => update({ fragile: e.target.checked })}
                  className="toggle-input"
                />
                <div className="toggle-switch"></div>
              </label>
            </div>

            <button className="reset-btn" onClick={resetFilters}>
              איפוס פילטרים
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
