// ייבוא של useState ו-useRef מ-React לניהול מצב וגישה לרפרנס
import { useState, useRef } from 'react';
// ייבוא רכיבים מ-React-Bootstrap לעיצוב רספונסיבי
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/UploadStyles.module.css';
import { Upload, Image, Images, X } from 'lucide-react';

// הגדרת הממשק עבור props של הקומפוננטה
interface ImageUploaderProps {
  onImageUpload: (file: File | File[]) => void; // פונקציה שמופעלת לאחר העלאת תמונה
  multiple?: boolean; // האם ניתן להעלות מספר תמונות (ברירת מחדל: false)
  maxImages?: number; // מספר התמונות המרבי להעלאה (רלוונטי אם multiple=true)
}

// הקומפוננטה הראשית
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, multiple = false, maxImages = 1 }) => {
  // הגדרת state למעקב אחר התמונות שהועלו
  const [images, setImages] = useState<string[]>([]);
  // יצירת ref עבור אלמנט input לצורך גישה ישירה אליו
  const fileInputRef = useRef<HTMLInputElement>(null);

  // פונקציה לטיפול בגרירה ושחרור קבצים
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // מניעת ההתנהגות הדיפולטיבית של הדפדפן
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files); // המרת הקבצים שגררו למערך
    handleFiles(files); // קריאה לפונקציה שמטפלת בקבצים
  };

  // פונקציה שמופעלת בלחיצה על הכרטיס כדי לפתוח את חלון בחירת הקבצים
  const handleClick = () => {
    fileInputRef.current?.click(); // פתיחת חלון הבחירה של קבצים
  };

  // פונקציה לטיפול בבחירת קבצים באמצעות input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // המרת הקבצים הנבחרים למערך
    handleFiles(files); // קריאה לפונקציה שמטפלת בקבצים
  };

  // פונקציה שמטפלת בקבצים שנבחרו או נגררו
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/')); // סינון קבצים מסוג תמונה
    const newImages = multiple // בדיקה אם multiple=true
      ? imageFiles.slice(0, maxImages - images.length) // מגביל לכמות שנותרה
      : imageFiles.slice(0, 1); // לוקח תמונה אחת בלבד

    // קריאה לכל קובץ תמונה והמרתו לנתונים בפורמט Base64
    newImages.forEach(file => {
      const reader = new FileReader(); // יצירת FileReader לקריאת הקובץ
      reader.onload = (e) => {
        setImages(prevImages => {
          const updatedImages = multiple
            ? [...prevImages, e.target?.result as string]
            : [e.target?.result as string];
  
          return updatedImages;
        });
      };
  
      onImageUpload(multiple ? images : images[0]);
      // קריאה חזרה ל-props שהועברו עם התמונות שהועלו
      
      reader.readAsDataURL(file); // קריאת תוכן הקובץ
    });
  };

  // פונקציה להסרת תמונה מהרשימה
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index)); // מסנן את התמונה לפי האינדקס
  };

  // ממשק המשתמש של הקומפוננטה
  return (
    <div className={`d-flex flex-column align-items-center`}>
      {/* כרטיס שמעוצב כשטח לגרירה ושחרור קבצים */}
      <Container
        onClick={handleClick} // פתיחת חלון קבצים בלחיצה
        onDragStart={(e) => {e.preventDefault(); e.stopPropagation();}} // מניעת ההתנהגות הדיפולטיבית של הדפדפן
        onDrop={handleDrop} // טיפול בגרירת קובץ
        onDragOver={(e) => {e.preventDefault(); e.stopPropagation();}} // מניעת התנהגות דיפולטיבית
        style={{ width: '100%', minHeight: '200px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className={styles.dropzone}
        >
        <div className="d-flex align-items-center justify-content-center p-3">
          {images.length === 0 ? ( // אם אין תמונות
            <p className="text-center">
                לחץ או גרור {multiple ? `עד ${maxImages} תמונות` : 'תמונה אחת'} לכאן {/* טקסט מותאם */}
            </p>
          ) : (
              !multiple ? ( // אם יש רק תמונה אחת
                <div className="w-100 h-100 position-relative" onClick={(e) => e.stopPropagation()}>
                  <img src={images[0]} alt="uploaded" className="w-100 h-100" style={{ objectFit: 'contain' }}/> {/* תצוגת תמונה */}
                  <button onClick={() => removeImage(0)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}><X /></button> {/* כפתור להסרת תמונה */}
                </div>
            ) : (
                <Row>
                  {images.length >= maxImages ? (
                    <p style={{ color: 'red', marginBottom: '10px' }}>
                      הגעת למגבלת התמונות המותרת.
                    </p>
                  ) : (
                    <p style={{ marginBottom: '10px' }}>
                      ניתן להוסיף {maxImages ? `עוד ${maxImages - images.length} תמונות` : 'תמונה אחת נוספת'}.
                    </p>
                  )}
                {/* תצוגת רשימת התמונות */}
                {images.map((image, index) => (
                <Col key={index} xs={6} md={4} lg={3} className="position-relative" onClick={(e) => e.stopPropagation()}>
                    <div className='position-relative'>
                      <img src={image} /> {/* תצוגת תמונה */}
                      <button onClick={() => removeImage(index)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}>x</button> {/* כפתור להסרת תמונה */}
                    </div>
                </Col>
                ))}
            </Row>
            ))}
        </div>
      </Container>
      {/* שדה בחירת קבצים (מוסתר מהמשתמש) */}
      <input
        type="file" // סוג הקלט: קובץ
        ref={fileInputRef} // הפניה ל-ref
        onChange={handleFileInput} // טיפול בבחירת קובץ
        accept="image/*" // קבצים מותרים: תמונות בלבד
        multiple={multiple} // האם לאפשר העלאת מספר תמונות
        style={{ display: 'none' }} // הסתרת האלמנט
      />
    </div>
  );
};

export default ImageUploader; // ייצוא הקומפוננטה לשימוש בקבצים אחרים
