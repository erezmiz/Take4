import ProfileDetails from '../components/ProfileDetails';
import SelectedProducts from '../components/SelectedProducts';
import './ProfilePage.css';

export default function ProfilePage() {
  return (
    <div dir="rtl">
      
      <main className="profile-page-main">
        <ProfileDetails />
        <SelectedProducts />
      </main>
      
    </div>
  );
}
