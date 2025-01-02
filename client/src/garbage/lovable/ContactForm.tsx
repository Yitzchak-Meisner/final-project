// ייבוא של useState מהספרייה React לצורך ניהול מצבים בקומפוננטה
import { useState } from "react"; 
// ייבוא של רכיבים מתוך react-bootstrap לצורך בניית טופס ורכיבי UI נוספים
import { Form, Button, Container } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

// הגדרת ממשק (interface) שמגדיר את מבנה הנתונים של הטופס
interface FormData {
  name: string; // שדה שם
  email: string; // שדה דוא"ל
  message: string; // שדה הודעה
}

// הגדרת קומפוננטה פונקציונלית בשם ContactForm
const ContactForm = () => {
  // יצירת מצב (state) לניהול תצוגת הטוסט (הודעה מוקפצת)
  const [showToast, setShowToast] = useState(false);
  // יצירת מצב (state) לניהול נתוני הטופס
  const [formData, setFormData] = useState<FormData>({
    name: "", // ערך התחלתי של השדה name
    email: "", // ערך התחלתי של השדה email
    message: "", // ערך התחלתי של השדה message
  });

  // פונקציה שמטפלת באירוע שליחת הטופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // מניעת רענון הדף בעת שליחת הטופס
    console.log("Form submitted:", formData); // הדפסת נתוני הטופס לקונסול
    setShowToast(true); // הצגת הודעת טוסט
    setFormData({ name: "", email: "", message: "" }); // איפוס שדות הטופס
  };

  // החזרת ממשק ה-UI של הטופס
  return (
    <Container>
      {/* רכיב טופס שמאזין לאירוע onSubmit */}
      <Form onSubmit={handleSubmit} className="mt-4 mx-auto" style={{ maxWidth: '500px' }}>
        {/* קבוצה ראשונה של שדה טקסט */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text" // סוג הקלט - טקסט
            placeholder="Name" // טקסט ברירת מחדל בשדה
            value={formData.name} // חיבור לערך מהמצב
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // עדכון המצב בעת שינוי
            required // הפיכת השדה לחובה
          />
        </Form.Group>

        {/* קבוצה שנייה של שדה דוא"ל */}
        <Form.Group className="mb-3">
          <Form.Control
            type="email" // סוג הקלט - דוא"ל
            placeholder="Email" // טקסט ברירת מחדל בשדה
            value={formData.email} // חיבור לערך מהמצב
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} // עדכון המצב בעת שינוי
            required // הפיכת השדה לחובה
          />
        </Form.Group>

        {/* קבוצה שלישית של שדה טקסט חופשי */}
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea" // שדה מסוג טקסט רב-שורות
            rows={5} // מספר השורות בתצוגה
            placeholder="Message" // טקסט ברירת מחדל בשדה
            value={formData.message} // חיבור לערך מהמצב
            onChange={(e) => setFormData({ ...formData, message: e.target.value })} // עדכון המצב בעת שינוי
            required // הפיכת השדה לחובה
          />
        </Form.Group>

        {/* כפתור שליחה */}
        <Button variant="primary" type="submit" className="w-100">
          Send Message
        </Button>
      </Form>

      {/* רכיב הודעת טוסט */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} // סגירת הטוסט בלחיצה
          show={showToast} // שליטה על תצוגת הטוסט לפי מצב
          delay={3000} // משך הזמן שבו הטוסט יופיע (במילישניות)
          autohide // סגירה אוטומטית לאחר הזמן שהוגדר
        >
          <Toast.Header>
            <strong className="me-auto">Message sent</strong> // כותרת הטוסט
          </Toast.Header>
          <Toast.Body>We'll get back to you soon!</Toast.Body> // גוף הטקסט בטוסט
        </Toast>
      </ToastContainer>
    </Container>
  );
};

// ייצוא ברירת מחדל של הקומפוננטה ContactForm
export default ContactForm;
