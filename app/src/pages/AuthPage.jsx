import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-page" dir="rtl">
      <main className="auth-page-main">
        <div className="auth-page-card">
          <AuthForm onSuccess={() => navigate('/dashboard')} />
        </div>
      </main>
    </div>
  );
}
