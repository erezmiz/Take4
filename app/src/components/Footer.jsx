import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">BringIt</div>
          <div className="footer-copyright">© 2024 BringIt. Built on Ne'emanut principles.</div>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Hebrew Support</a>
          <a href="#" className="footer-link">Safety Center</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
