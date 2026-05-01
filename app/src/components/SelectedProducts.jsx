import SelectedProduct from './SelectedProduct';
import './SelectedProducts.css';

export default function SelectedProducts() {
  const deals = [
    {
      name: 'נעלי ספורט במהדורה מוגבלת',
      from: 'לונדון, בריטניה',
      to: 'ניו יורק, ארה"ב',
      price: '210.00',
      status: 'נמסר',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOXXyJ43Xu225VjHncLNaUUAEyn8F0pnGST0quaERVzndzwLMmYne2l6aY_oPdVzpyoopwmqnvdmopdyx5rnrKpjTFEW2HdChAz9HguLVbyUyjyUngdeYziSH9G-Shr9GVSBXPN0UGSqMDG09NezsqhX7txwVAu3RdWXoavYthTed7m9XQCFQDQ6pK3bIjUFcoj_N2WGH-ZHtG8f4-V4u65QYo4c4RFrVYQeBIv4trjuvVglI1IbgpP2OfmH7wN2IJWOIlEusu5Mya',
    },
    {
      name: 'שעון אנלוגי מינימליסטי',
      from: 'טוקיו, יפן',
      to: 'ניו יורק, ארה"ב',
      price: '145.50',
      status: 'נרכש',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdGCR3aWe-0ZW9EErfD0guvvCfBT6L_n8-_vtPPV_syQhoWTHFHvBEDX7hxZVDYwVpvikyEjGgVSZBg4zsI_W1-4K52UgfNE44lgokuHGDACMuTVTCab0o95SVgQCSSnvW49AIEdn1tfZ6jtWn_dGlG87HyaM3Eyn6GMQmeJek4ajbr43uZNulJdtZnyNMxMfY36vgjBj0B-7psyPRZ8CCiyksq1ySb2_rlTKrMU20xG7SUud4lfbLU9aOkMJIavWUcdPZsh066mK',
    },
    {
      name: 'תיק עור בעבודת יד',
      from: 'פירנצה, איטליה',
      to: 'ניו יורק, ארה"ב',
      price: '320.00',
      status: 'שולם (נאמנות)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyX_9f7uwes-7WSFyE6rSmmqDCn5JaY2kr38fXgMn81nHLHhSN4l_G53W28J-CsAikksYWdKsM0mJftPyal7en8o134w0zgkYG6ZgBs4Khyd1h5bUSssU3t5kttA-K88VXmxu4zMYp7nJfAjFB_SRm4egxeX7-HBuyx8L3itaw-zBPBxQf0WK145LONP-bcxm8QO7wZHMCd9Uef9fHTlKS5D8MasThkURG5UknUU5p8lhqLVeInZyeBPfKPDiwoj9HGg_ee_gBljQE',
    },
  ];

  return (
    <section className="deals-section">
      <div className="deals-header">
        <div>
          <h2>עסקאות פעילות</h2>
          <p>עקוב אחר הבקשות הפעילות שלך בקהילה</p>
        </div>
        <button className="history-btn">צפה בהיסטוריה</button>
      </div>
      <div className="deals-list">
        {deals.map((deal, index) => (
          <SelectedProduct key={index} deal={deal} />
        ))}
      </div>
    </section>
  );
}
