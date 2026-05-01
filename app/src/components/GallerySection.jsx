import './GallerySection.css';

export default function GallerySection() {
  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-left">
          <div className="gallery-badge">בשימוש על ידי 50,000+ מטיילים</div>
          <h1 className="gallery-title">
            קנו <span className="text-primary">בזול יותר</span> מחו"ל / הרוויחו <span className="text-success">כסף</span> מהטיסה שלכם.
          </h1>
          <p className="gallery-subtitle">
            פלטפורמת הקהילה שמחברת בין קונים למטיילים. קבלו מוצרים מקוריים מכל מקום בעולם, או הפכו את המקום הפנוי במזוודה לכסף.
          </p>
          <div className="gallery-buttons">
            <button className="btn-primary">התחילו לקנות</button>
            <button className="btn-secondary">הפכו למטיילים</button>
          </div>
        </div>

        <div className="gallery-right">
          <div className="gallery-grid">
            <div className="gallery-item main-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU6OEgcl2SBSMaVgm2K5T86Dx5Q8N2gw25-6mUtXGa4QaIdHHc8FzW9qWD6wh6llSS-NRzwlTPRMQpur0P4Dto3RipfCyl3EbX-bqNKDJAqcxTlw0y4d25DcIq3wikT6v7jiAgt7YB1sFyqcGltN9QaEaI9L21LorW7KGJPrHLsqgO1vL2i3nAxP8cBZvzGBXVziiWbU7bpQ62Kc6CZImWRYWCG4x5L2ah2li1s-_FcrPT7foBj4EJMB7WcEB2dNupU2fiFqbfLx0S"
                alt="Shopping bags at airport"
              />
            </div>

            <div className="gallery-item trust-box">
              <span className="trust-icon">🛡️</span>
              <span className="trust-label">100% בטוח</span>
              <span className="trust-desc">החזר כספי מובטח על כל הזמנה</span>
            </div>

            <div className="gallery-item image-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeY_soAEZZ1YIRY6ulfwn5rEm_VFpnE8IOVPt1Fb9evpeGCw7_fEwqL11U7oVQoA_wE6xwVpH7EZm9H7m9YDfedb93Ek2dBy20aiFf3EbpAYPx_UWnE1XmcjQ36TgTGHsQqK6ZyV1cnK4kinQrR0xfwYrAanp31x-SgbXZtaROOmumCbzklkBk9lCXx37m-etvdgsh_aHIDNOgmuvfVT_5WHm64ebOuFRkWCsh6dzdXJhLaH9rzGI_n_l0ckKd8D9Nl7g6_g33UWLQ"
                alt="Travel suitcase"
              />
            </div>

            <div className="gallery-item testimonial">
              <div className="testimonial-avatars">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDys9DEyH1AGuibFdvDRE8QzwHIaWZgmqIMwvJLE92myaDKhflwrHxqKMTYvfwXyOVgf-BFVUcFKc3JecvdLlr8uerYf_-jhqCn-VVgGS8MG3MWoI2snAUvmPCwrN9ycqR4BWIVQtiF3pjPfSQJcxsmzq2vOBcrjvRvlK3Bk_5YO0rp1qjoPoVAA_JfvbG01Zu1RMkIUS--cpokEovPL0MTVZ-exqvJZjvT_k8_owFicS5to0_odZE4TwzDbd_2_sxwec-33fP4E9rQ" alt="" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS3j8u_UnFd4s1XEL0ukpk-22lIaSkT1ZILK6jnSd6qciKh9Y3zrRAgDZhhfS47uqLimOQ722X6HmGTe1LAwSw4CNgCbMhhDOqS1EQSQRyNsbasAYfdqA3jMQG9mf76R5ejmkCvaHSqSBPsjh8ZeQSUUjH7KABANP6ZHAjmUd5BuJn4Hxynexs5iLKzw02vripdIKBrTuNNLDlPNrZElwD_fCFw15AwxHwvb4JDmSULRnxCFpvuIspEcC3XOXhZ1246CjdbLHDy2Jm" alt="" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAoGp7OhGpYFk-Nc_Bu3wFaN-W_rlkNTIR4I7LsXKtJqDAiKWZBvOgh6BqeyZ3LGeAyyqO7Ce_PI6CoFOiFeIdedyaLw14PW7hdj3x_QLCgGnYWMytOsbijdruGudihbfPxKFRH8iKjBaHlZBstFN4WRxwllK5aKRZ_oBgmlF_wEAsgy6VUHtxvkTe_ZttYkfAtmcDPxlhiYspx_ECVgnl-Ck2wTpM54tn20vXK5fYD971gGpJWrbjGaagMnqFitVBbaRJF9rrUHCK" alt="" />
                <div className="avatar-count">+2k</div>
              </div>
              <p className="testimonial-text">הרווחתי $400 בטיסה שלי מניו יורק לפריז פשוט על ידי הבאת מוצרי יוקרה.</p>
              <span className="testimonial-author">— שרה ק., מטיילת מקצוענית</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
