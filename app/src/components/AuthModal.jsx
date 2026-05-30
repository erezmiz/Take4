import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';
import './AuthModal.css';

export default function AuthModal() {
  const { isModalOpen, closeAuthModal } = useAuth();

  if (!isModalOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeAuthModal();
  };

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
      <div className="auth-modal-card" dir="rtl">
        <button className="auth-modal-close" type="button" onClick={closeAuthModal}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <AuthForm onSuccess={closeAuthModal} />
      </div>
    </div>
  );
}
