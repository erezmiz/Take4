import { useState, useEffect, useRef } from 'react';
import './CitySelect.css';

const CITIES = [
  'ניו יורק, ארה"ב',
  'לוס אנג\'לס, ארה"ב',
  'שיקגו, ארה"ב',
  'מיאמי, ארה"ב',
  'לאס וגאס, ארה"ב',
  'סן פרנסיסקו, ארה"ב',
  'לונדון, בריטניה',
  'פריז, צרפת',
  'ברלין, גרמניה',
  'מדריד, ספרד',
  'ברצלונה, ספרד',
  'מילאנו, איטליה',
  'רומא, איטליה',
  'אמסטרדם, הולנד',
  'ציריך, שווייץ',
  'ווינה, אוסטריה',
  'פראג, צ\'כיה',
  'ברוסל, בלגיה',
  'שטוקהולם, שוודיה',
  'קופנהגן, דנמרק',
  'מונטריאול, קנדה',
  'טורונטו, קנדה',
  'ונקובר, קנדה',
  'סאו פאולו, ברזיל',
  'בואנוס איירס, ארגנטינה',
  'מקסיקו סיטי, מקסיקו',
  'טוקיו, יפן',
  'אוסקה, יפן',
  'סיאול, קוריאה הדרומית',
  'שנחאי, סין',
  'בייג\'ינג, סין',
  'הונג קונג',
  'סינגפור',
  'בנגקוק, תאילנד',
  'קואלה לומפור, מלזיה',
  'מומבאי, הודו',
  'דובאי, איחוד האמירויות',
  'אבו דאבי, איחוד האמירויות',
  'סידני, אוסטרליה',
  'מלבורן, אוסטרליה',
];

export default function CitySelect({ value, onChange, placeholder = 'חפש ובחר עיר...' }) {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        if (!CITIES.includes(query)) setQuery(value || '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query, value]);

  const filtered = query
    ? CITIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : CITIES;

  const handleSelect = (city) => {
    setQuery(city);
    onChange(city);
    setOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
  };

  return (
    <div className="city-select" ref={containerRef}>
      <div className="city-input-wrapper">
        <span className="city-search-icon">✈</span>
        <input
          type="text"
          className="city-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        {query && (
          <button type="button" className="city-clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul className="city-dropdown">
          {filtered.map((city) => (
            <li
              key={city}
              className={`city-option ${city === value ? 'city-option--selected' : ''}`}
              onMouseDown={() => handleSelect(city)}
            >
              <span className="city-option-bullet">●</span>
              <span className="city-option-name">{city}</span>
              {city === value && <span className="city-option-check">✓</span>}
            </li>
          ))}
        </ul>
      )}

      {open && filtered.length === 0 && (
        <div className="city-no-results">לא נמצאו תוצאות</div>
      )}
    </div>
  );
}
