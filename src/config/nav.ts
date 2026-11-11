export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: Record<'en' | 'hi', { header: NavItem[]; footer: NavItem[][] }> = {
  en: {
    header: [
      {
        label: 'Study Abroad', href: '/study-abroad/',
        children: [
          { label: 'Canada', href: '/study-abroad/canada/' },
          { label: 'UK', href: '/study-abroad/uk/' },
          { label: 'Australia', href: '/study-abroad/australia/' },
          { label: 'Germany', href: '/study-abroad/germany/' },
        ],
      },
      {
        label: 'Work Abroad', href: '/work-abroad/',
        children: [
          { label: 'Germany', href: '/work-abroad/germany/' },
          { label: 'Poland', href: '/work-abroad/poland/' },
          { label: 'UAE', href: '/work-abroad/uae/' },
        ],
      },
      { label: 'For Employers', href: '/for-employers/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'How It Works', href: '/how-it-works/' },
      { label: 'About', href: '/about/' },
    ],
    footer: [
      [
        { label: 'Study Abroad', href: '/study-abroad/' },
        { label: 'Work Abroad', href: '/work-abroad/' },
        { label: 'For Employers', href: '/for-employers/' },
        { label: 'Partners', href: '/partners/' },
      ],
      [
        { label: 'How It Works', href: '/how-it-works/' },
        { label: 'About Us', href: '/about/' },
        { label: 'FAQ', href: '/faq/' },
        { label: 'Contact', href: '/contact/' },
      ],
      [
        { label: 'Fees & Transparency', href: '/fees-and-transparency/' },
        { label: 'Fraud Awareness', href: '/fraud-awareness/' },
        { label: 'Privacy Policy', href: '/legal/privacy/' },
        { label: 'Terms of Service', href: '/legal/terms/' },
        { label: 'Disclaimer', href: '/legal/disclaimer/' },
        { label: 'Refunds', href: '/legal/refunds/' },
        { label: 'Cookie Policy', href: '/legal/cookies/' },
      ],
    ],
  },
  hi: {
    header: [
      { label: 'विदेश में पढ़ाई', href: '/hi/study-abroad/' },
      { label: 'विदेश में काम', href: '/hi/work-abroad/' },
      { label: 'हमारे बारे में', href: '/hi/' },
      { label: 'संपर्क करें', href: '/hi/contact/' },
    ],
    footer: [
      [
        { label: 'विदेश में पढ़ाई', href: '/hi/study-abroad/' },
        { label: 'विदेश में काम', href: '/hi/work-abroad/' },
        { label: 'संपर्क करें', href: '/hi/contact/' },
      ],
      [
        { label: 'शुल्क और पारदर्शिता', href: '/hi/fees/' },
        { label: 'धोखाधड़ी जागरूकता', href: '/hi/fraud-awareness/' },
        { label: 'गोपनीयता नीति', href: '/legal/privacy/' },
      ],
    ],
  },
};
