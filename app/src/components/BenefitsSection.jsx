import BenefitCard from './BenefitCard';
import './BenefitsSection.css';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: '💰',
      title: 'חיסכון אדיר',
      description: 'הימנעו מעלויות שילוח בינלאומיות גבוהות ומסי יבוא. קנו במחירים מקומיים בכל מדינה.'
    },
    {
      icon: '✈️',
      title: 'טוסו בחינם',
      description: 'הרוויחו מספיק כסף כדי לכסות את עלויות הטיסה שלכם על ידי מסירת פריטים קטנים המבוקשים על ידי המקומיים.'
    },
    {
      icon: '✅',
      title: 'אמון מאומת',
      description: 'מערכת הנאמנות המאובטחת שלנו מבטיחה שהתשלומים ישוחררו רק כאשר הפריטים נמסרו בבטחה.'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">למה קהילת BringIt?</h2>
          <p className="benefits-subtitle">מסחר עולמי פוגש אמון אישי. אנחנו מגדירים מחדש איך אתם משיגים את מה שאתם אוהבים.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
