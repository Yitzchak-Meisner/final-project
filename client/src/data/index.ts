export const navLinks = [
    {
      id: 1,
      path: '/',
      text: 'דף הבית',
    },
    // {
    //   id: 2,
    //   path: '',
    //   text: 'מה חדש',
    // },
    {
      id: 3,
      path: 'categories/table-centerpieces',
      text: 'מרכזי שולחן',
    },
    {
      id: 4,
      path: 'bars',
      text: 'ברים',
    },
    {
      id: 5,
      path: 'categories/home-boutique-events',
      text: 'אירועי בוטיק ביתי',
    },
    {
      id: 6,
      path: 'categories/luxury-events',
      text: 'אירועי יוקרה',
    },
    {
      id: 7,
      path: 'categories/bat-mitzvah',
      text: 'בת-מצווה',
    },
    {
      id: 8,
      path: 'about-us',
      text: 'אודותינו',
    },
    {
      id: 9,
      path: 'contact-us',
      text: 'צור קשר',
    },
];

export const links: Record<string, string> = {
  'table-centerpieces': 'מרכזי שולחן',
  'floor-bar': 'בר ריצפתי',
  'table-bar': 'בר שולחני',
  'home-boutique-events': 'אירועי בוטיק ביתי',
  'luxury-events': 'אירועי יוקרה',
  'bat-mitzvah': 'בת מצווה'
};

export function translateKeyValue(input: string): string | null {
  // בדוק אם מדובר במפתח
  if (links[input]) {
      return links[input]; // החזר את הערך
  }

  // בדוק אם מדובר בערך
  const key = Object.keys(links).find(key => links[key] === input);
  if (key) {
      return key; // החזר את המפתח
  }

  return null; // אם לא נמצא תרגום
}