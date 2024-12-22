// src/types.ts

// טייפ עבור תמונות
export interface Image {
    id: string;
    image_data: string; // Base64 או URL לתמונה
    category: string;
    dateUploaded?: string; // תאריך העלאה
}

// טייפ עבור הודעות
export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    status: string; // לדוגמה: "נענתה" או "לא נענתה"
}

// טייפ עבור לינקים לניווט
export interface NavLink {
    id: string;
    path: string;
    text: string;
}

// טייפ עבור פרופס של קומפוננטות עם פופאפ
export interface PopupProps {
    togglePopup: () => void;
    title: string;
    content: React.ReactNode;
}

// טייפים כלליים עבור סטטוס הטעינה
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// טייפ עבור הודעת שגיאה
export interface Error {
    message: string;
}
