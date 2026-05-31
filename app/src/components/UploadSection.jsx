import './UploadSection.css';

export default function UploadSection({ file, onFileChange, existingUrl }) {
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;

  return (
    <div className="upload-section-container">
      <label className="input-label">תמונת מוצר</label>
      <div className="upload-grid">

        <div className={`drop-zone ${file ? 'drop-zone--selected' : existingUrl ? 'drop-zone--existing' : ''}`}>
          <span className="upload-icon">
            {file ? '✓' : existingUrl ? '🖼' : '⬆'}
          </span>
          {file ? (
            <p className="drop-zone-text">{file.name}</p>
          ) : existingUrl ? (
            <>
              <p className="drop-zone-text">תמונה קיימת</p>
              <p className="drop-zone-hint">לחצו להחלפת התמונה</p>
            </>
          ) : (
            <>
              <p className="drop-zone-text">לחצו להעלאה או גררו לכאן</p>
              <p className="drop-zone-hint">PNG, JPG, או WEBP עד 10MB</p>
            </>
          )}
          <input
            type="file"
            className="file-input"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onFileChange(e.target.files[0] ?? null)}
          />
        </div>

        <div className="preview-zone">
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="תצוגה מקדימה" className="preview-image" />
              <div className="preview-overlay">תצוגה מקדימה</div>
            </>
          ) : (
            <div className="preview-placeholder">
              <span className="preview-placeholder-icon">🖼</span>
              <span>תצוגה מקדימה תופיע כאן</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
