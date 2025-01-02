// ייבוא של קומפוננטות Modal ו-Button מהספרייה react-bootstrap
import { Modal, Button } from 'react-bootstrap';

// ייבוא של אייקונים Heart ו-X מהספרייה lucide-react
import { Heart, X } from 'lucide-react';

// ייבוא קובץ ה-CSS לעיצוב של הקומפוננטה
import './ImagePopup.css';

// הגדרת ממשק (interface) שמתאר את המבנה של אובייקט מסוג Image
interface Image {
  id: string; // מזהה ייחודי של התמונה
  url: string; // כתובת ה-URL של התמונה
  liked: boolean; // אינדיקציה האם התמונה אהובה או לא
}

// הגדרת ממשק (interface) עבור הפרופס של הקומפוננטה ImagePopup
interface ImagePopupProps {
  image: Image; // אובייקט של תמונה
  onClose: () => void; // פונקציה לסגירת הפופ-אפ
  onLike: () => void; // פונקציה לסימון "אהבתי"
  isLiked: boolean; // אינדיקציה האם התמונה מסומנת כ"אהבתי"
  show: boolean; // אינדיקציה האם להציג את הפופ-אפ
}

// הגדרת קומפוננטה בשם ImagePopup שמשתמשת בפרופס מסוג ImagePopupProps
const ImagePopup: React.FC<ImagePopupProps> = ({ image, onClose, onLike, isLiked, show }) => {
  return (
    // שימוש בקומפוננטת Modal להצגת פופ-אפ
    <Modal
      show={show} // פרופס שמגדיר אם להציג את הפופ-אפ
      onHide={onClose} // פרופס שמגדיר מה יקרה כשנסגור את הפופ-אפ
      centered // מגדיר שהפופ-אפ יהיה ממורכז
      size="xl" // גודל גדול במיוחד לפופ-אפ
      className="image-popup-modal" // מחלקת עיצוב מותאמת אישית
    >
      {/* גוף הפופ-אפ */}
      <Modal.Body className="p-0 position-relative">
        {/* קונטיינר שמגדיר יחס גובה-רוחב של 16:9 */}
        <div className="ratio ratio-16x9">
          {/* הצגת התמונה */}
          <img
            src={image.url} // כתובת התמונה מתוך הפרופס
            alt="" // תיאור חלופי ריק
            className="object-fit-cover w-100 h-100 rounded" // מחלקות עיצוב
          />
        </div>
        
        {/* כפתור לסגירת הפופ-אפ */}
        <Button
          variant="light" // סגנון בהיר לכפתור
          className="position-absolute top-0 end-0 m-3 rounded-circle p-2" // מיקום ועיצוב הכפתור
          onClick={onClose} // קריאה לפונקציה onClose כשנלחץ הכפתור
        >
          <X className="text-secondary" size={20} /> {/* אייקון X מתוך lucide-react */}
        </Button>
        
        {/* כפתור לסימון "אהבתי" */}
        <Button
          variant="light" // סגנון בהיר לכפתור
          className="position-absolute top-0 start-0 m-3 rounded-circle p-2" // מיקום ועיצוב הכפתור
          onClick={onLike} // קריאה לפונקציה onLike כשנלחץ הכפתור
        >
          {/* אייקון לב שמחליף צבע בהתאם למצב isLiked */}
          <Heart 
            className={isLiked ? 'text-danger fill-danger' : 'text-secondary'} 
            size={20}
          />
        </Button>
      </Modal.Body>
    </Modal>
  );
};

// ייצוא הקומפוננטה כברירת מחדל
export default ImagePopup;
