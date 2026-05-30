import { useAuth } from '../context/AuthContext';
import ActionCard from './ActionCard';
import './ActionSection.css';

export default function ActionSection() {
  const { user, openAuthModal } = useAuth();

  const handleActionClick = () => {
    if (!user) openAuthModal();
  };

  const actions = [
    {
      title: 'רוצים משהו מחו"ל?',
      description: 'בקשו מוצרים שאינכם יכולים למצוא בארץ ושלמו מחירים מקומיים.',
      buttonText: 'פרסמו בקשה',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_QsA-vEmfjs7op2YFs28ynYev9g14dMIGImpd8wznt4mdH3sWieM60NgETBMaDwWmKiplLcTOh2dRQ76lQWaPZ2hLTu4uZvt2ZvnUJ1WkagVCtO35SjCYHdqHCTpfYgtleu7j9xMIrc8wN_eJKeItVOyk543MufYgrViWYeqbcmUYU1If4vb5t4DkcSwS-pU-hDjZYny0mHUQuU00Jfp6P4cJF7raxT8Qw7PsMr7ccaPuvQQSpGdJ4jZMx0nlALomsk_FI_67h_Jd'
    },
    {
      title: 'טסים לאנשהו בקרוב?',
      description: 'הרוויחו כסף בטיסה שלכם על ידי מסירת פריטים. נצלו את המקום הפנוי שלכם.',
      buttonText: 'הוסיפו נסיעה',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkctywjEDgoQz5noTDq9_2rz5mJqoe-9HX7ZQdyHhKdLOu2K9KmJRdbU0DTIQ5zU2lHTIlX7SI9Y2-O2sIU1b9N11666e1V8I-i1mTOQfvoU9ueGBSnQV7clmZHoLc_SYfLxAd-cqIzAR7wHMwKEEKsLewk6JzmaJBPD_ArRQ_g3SigMLhPzinpyrnlzYeLfX_eWKVKpmB9oEYU8hcfxJkrxkmdWnaB_4ZHBD96KcYH40zVUROE94_Hspazzgvlp-AezeMzhAnqZdr'
    }
  ];

  return (
    <section className="action-section">
      <div className="action-container">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            buttonText={action.buttonText}
            backgroundImage={action.backgroundImage}
            onButtonClick={handleActionClick}
          />
        ))}
      </div>
    </section>
  );
}
