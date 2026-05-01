import './UploadSection.css';

export default function UploadSection() {
  return (
    <div className="upload-section-container">
      <label className="input-label">תמונת מוצר</label>
      <div className="upload-grid">
        <div className="drop-zone">
          <span className="material-symbols-outlined">cloud_upload</span>
          <p className="drop-zone-text">לחצו להעלאה או גררו לכאן</p>
          <p className="drop-zone-hint">PNG, JPG, או WEBP עד 10MB</p>
          <input type="file" className="file-input" />
        </div>
        <div className="preview-zone">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtXC4wi3Fpo293HLg6nI9CMt_DQ4ZVKVBpPpHlqGitVejb9Za40U0Rgp9DaeBLUWAmwhx7pHeecG8a3v46XZ5KHRenAnaC3q4fk-sZB34g-a5oMhAxpqfkAo2FDwar2ger9wAlZaRQcFq6ZenRHIma8bZHjfghuxqStJM_LuaAQA-auP6BMms1K1XAYypcIghFaA6KnPF-ex8vbfMkQnuguN9VCCpVFQrxIaTxaI4nzPGzP1CIynd9pQIwwLSNejnjpI1QzKXGJ7LT" 
            alt="Product Example" 
            className="preview-image" 
          />
          <div className="preview-overlay">
            תצוגה מקדימה תופיע כאן
          </div>
        </div>
      </div>
    </div>
  );
}
