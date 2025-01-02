// מייבא את React והפונקציה useState לשימוש בסטייט בתוך הרכיב.
import { useState } from 'react'; 

// מייבא רכיבים מהספרייה react-bootstrap כמו Container, Row, Col, ו-Button לצורך עיצוב.
import { Container, Row, Col, Button } from 'react-bootstrap'; 

// מייבא את האייקון Heart מספריית lucide-react.
import { Heart } from 'lucide-react';

// מייבא רכיב בשם ImagePopup לצורך הצגת תמונה נבחרת ב-Popup.
import ImagePopup from './ImagePopup'; 

// מייבא קובץ CSS לעיצוב.
import './ImageGallery.css'; 

// הגדרת ממשק TypeScript בשם Image, שמייצג את מבנה האובייקט של תמונה בגלריה.
interface Image { 
  id: string; // מזהה ייחודי לתמונה.
  url: string; // כתובת URL של התמונה.
  liked: boolean; // מצב הלייק של התמונה.
}

// הגדרת רכיב React בשם ImageGallery.
const ImageGallery: React.FC = ( { images , deleteImg } ) => { 
  // סטייט לשמירת התמונה שנבחרה (או null אם אין תמונה נבחרת).
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); 
  
  // סטייט לשמירת מזהי תמונות שסומנו כ-"אהובות" (Liked) בעזרת Set.
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set()); 

  // פונקציה לטיפול בלייקים: מוסיפה או מסירה מזהה תמונה מתוך ה-Set.
  const handleLike = (imageId: string) => { 
    setLikedImages(prev => { 
      const newSet = new Set(prev); // יוצר עותק של ה-Set הקיים.
      if (newSet.has(imageId)) { // בודק אם התמונה כבר מסומנת כלייק.
        newSet.delete(imageId); // מסיר את התמונה מהסט.
      } else {
        newSet.add(imageId); // מוסיף את התמונה לסט.
      }
      return newSet; // מחזיר את הסט החדש.
    });
  };

  // מחזיר את התצוגה של הרכיב.
  return (
    <Container className="py-5"> {/* עוטף את התוכן הראשי עם ריווח אנכי */}
      <Row className="g-4"> {/* מסדר את התמונות ברשת (grid) עם מרווחים */}
        {images.map((image) => ( /* עובר על כל תמונה במערך ומציג אותה כעמודה ברשת */
          <Col key={image.id} xs={12} md={6} lg={4}> {/* מגדיר גודל לעמודות ביחס למסכים שונים */}
            <div 
              className="position-relative gallery-item" 
              style={{ cursor: 'pointer' }} /* מגדיר עיצוב וסמן מצביע */
            >
              <div 
                className="ratio ratio-4x3" /* מגדיר יחס גובה-רוחב קבוע לתמונות */
                onClick={() => setSelectedImage(image)} /* מציב את התמונה הנבחרת בסטייט */
              >
                <img
                  src={image.url} /* כתובת התמונה */
                  alt="" /* טקסט אלטרנטיבי */
                  className="object-fit-cover rounded" /* עיצוב התמונה */
                />
              </div>
              <Button
                variant="light"
                className="position-absolute top-0 end-0 m-3 rounded-circle p-2 gallery-like-button" /* מיקום עיצובי ללחצן */
                onClick={(e) => { 
                  e.stopPropagation(); /* מונע פתיחת התמונה כאשר לוחצים על הלייק */
                  handleLike(image.id); /* מפעיל את פונקציית הלייק */
                }}
              >
                <Heart 
                  className={likedImages.has(image.id) ? 'text-danger fill-danger' : 'text-secondary'} /* משנה את צבע האייקון לפי מצב הלייק */
                  size={20} /* גודל האייקון */
                />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      
      {/* מציג את ה-Popup של התמונה אם נבחרה תמונה */}
      {selectedImage && ( 
        <ImagePopup
          image={selectedImage} /* מעביר את התמונה הנבחרת */
          onClose={() => setSelectedImage(null)} /* סוגר את ה-Popup */
          onLike={() => handleLike(selectedImage.id)} /* מפעיל לייק על התמונה */
          isLiked={likedImages.has(selectedImage.id)} /* בודק אם התמונה מסומנת כלייק */
          show={!!selectedImage} /* מציג את ה-Popup */
        />
      )}
    </Container>
  );
};

// מייצא את הרכיב כברירת מחדל לשימוש בקובץ אחר.
export default ImageGallery;
