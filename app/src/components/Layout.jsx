import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <AuthModal />
    </>
  );
}
