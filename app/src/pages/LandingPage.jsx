import GallerySection from '../components/GallerySection';
import BenefitsSection from '../components/BenefitsSection';
import ActionSection from '../components/ActionSection';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page" dir="rtl">
      
      <main className="landing-main">
        <GallerySection />
        <BenefitsSection />
        <ActionSection />
      </main>
      
    </div>
  );
}
