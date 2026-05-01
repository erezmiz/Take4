import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileDetails from '../components/ProfileDetails';
import SelectedProducts from '../components/SelectedProducts';
import './ProfilePage.css';

export default function ProfilePage({ onNavigate }) {
  return (
    <div dir="rtl">
      <Navbar onNavigate={onNavigate} />
      <main className="profile-page-main">
        <ProfileDetails />
        <SelectedProducts />
      </main>
      <Footer />
    </div>
  );
}
