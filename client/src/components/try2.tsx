// ייבוא של useState ו-useRef מ-React לניהול מצב וגישה לרפרנס
import { useState, useRef } from 'react';
// ייבוא רכיבים מ-React-Bootstrap לעיצוב רספונסיבי
import { Card, Row, Col } from 'react-bootstrap';
import styles from '../styles/UploadStyles.module.css';
import { Upload, Image, Images } from 'lucide-react';

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
        setImages(prevImages => multiple ? [...prevImages, e.target?.result as string] : [e.target?.result as string]); // עדכון ה-state עם כתובת התמונה
      };
      reader.readAsDataURL(file); // קריאת תוכן הקובץ
    });

    // קריאה חזרה ל-props שהועברו עם התמונות שהועלו
    onImageUpload(multiple ? newImages : newImages[0]);
  };

  // פונקציה להסרת תמונה מהרשימה
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index)); // מסנן את התמונה לפי האינדקס
  };

  // ממשק המשתמש של הקומפוננטה
  return (
    <div className={`d-flex flex-column align-items-center`}>
      {/* כרטיס שמעוצב כשטח לגרירה ושחרור קבצים */}
      <Card
        onClick={handleClick} // פתיחת חלון קבצים בלחיצה
        onDrop={handleDrop} // טיפול בגרירת קובץ
        onDragOver={(e) => e.preventDefault()} // מניעת התנהגות דיפולטיבית
        style={{ width: '50%', minHeight: '200px', cursor: 'pointer' }} // עיצוב הכרטיס
        className={styles.dropzone!}
        >
        <Card.Body className="d-flex align-items-center justify-content-center">
          {images.length === 0 ? ( // אם אין תמונות
            <Card.Text>
                לחץ או גרור {multiple ? `עד ${maxImages} תמונות` : 'תמונה אחת'} לכאן {/* טקסט מותאם */}
            </Card.Text>
          ) : (
              !multiple ? ( // אם יש רק תמונה אחת
                <Card className="w-100 h-100 position-relative" onClick={(e) => e.stopPropagation()}>
                  <Card.Img variant="top" src={images[0]} className="w-100 h-100" style={{ objectFit: 'contain' }}/> {/* תצוגת תמונה */}
                  <button onClick={() => removeImage(0)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}>X</button> {/* כפתור להסרת תמונה */}
                </Card>
            ) : (
                <Row>
                    {images.length < (maxImages || 1) && (
                        <p style={{ marginBottom: '10px' }}>
                            ניתן להוסיף {maxImages ? `עוד ${maxImages - images.length} תמונות` : 'תמונה אחת נוספת'}.
                        </p>
                    )}
                {/* תצוגת רשימת התמונות */}
                {images.map((image, index) => (
                <Col key={index} xs={6} md={4} lg={3} className="position-relative" onClick={(e) => e.stopPropagation()}>
                    <Card>
                      <Card.Img variant="top" src={image} /> {/* תצוגת תמונה */}
                      <button onClick={() => removeImage(index)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}>x</button> {/* כפתור להסרת תמונה */}
                    </Card>
                </Col>
                ))}
            </Row>
            ))}
        </Card.Body>
      </Card>
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
