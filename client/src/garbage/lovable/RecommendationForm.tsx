// מייבאים את useState מה-React כדי לנהל מצבים (states) בקומפוננטה
import { useState } from "react";

// מייבאים רכיבים מוכנים מהספרייה react-bootstrap לצורך שימוש בתצוגה ובכפתורים
import { Form, Button, Container } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

// מגדירים ממשק (interface) לטיפוס הנתונים של הטופס
interface FormData {
  name: string; // שם המשתמש
  recommendation: string; // המלצה של המשתמש
}

// קומפוננטה בשם RecommendationForm - רכיב React פונקציונלי
const RecommendationForm = () => {
  // ניהול מצב האם ה-Toast (הודעת הצלחה) יוצג או לא
  const [showToast, setShowToast] = useState(false);

  // ניהול מצב של הנתונים שמוזנים בטופס, מתחיל כערכים ריקים
  const [formData, setFormData] = useState<FormData>({
    name: "", // התחלה בשם ריק
    recommendation: "", // התחלה עם שדה המלצה ריק
  });

  // פונקציה שמטפלת באירוע של שליחת הטופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // מונע מהדפדפן רענון דף כברירת מחדל
    console.log("Recommendation submitted:", formData); // מדפיס את המידע שנשלח בקונסול
    setShowToast(true); // מציג את הודעת ההצלחה
    setFormData({ name: "", recommendation: "" }); // מאפס את שדות הטופס
  };

  // מה שהקומפוננטה מחזירה לתצוגה
  return (
    <Container className="mt-4">
      {/* טופס (Form) עם אירוע submit שמופעל ב-handleSubmit */}
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
        {/* קבוצה של שדה טקסט */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text" // סוג השדה - טקסט
            placeholder="Name" // טקסט ברירת מחדל בשדה
            value={formData.name} // הערך של השדה שווה למצב (state)
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // מעדכן את ה-state
            required // השדה חובה
          />
        </Form.Group>

        {/* קבוצה של שדה טקסט ארוך */}
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea" // שדה טקסט מרובה שורות
            rows={5} // מספר השורות
            placeholder="Your recommendation" // טקסט ברירת מחדל בשדה
            value={formData.recommendation} // הערך של השדה שווה למצב (state)
            onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })} // מעדכן את ה-state
            required // השדה חובה
          />
        </Form.Group>

        {/* כפתור לשליחת הטופס */}
        <Button variant="primary" type="submit" className="w-100">
          Send Recommendation
        </Button>
      </Form>

      {/* קונטיינר להודעות Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} // סוגר את ה-Toast כשהמשתמש לוחץ על כפתור הסגירה
          show={showToast} // האם להציג את ה-Toast לפי המצב (state)
          delay={3000} // אורך זמן ההצגה במילישניות
          autohide // סגירה אוטומטית לאחר פרק הזמן שצוין
        >
          <Toast.Header>
            <strong className="me-auto">Recommendation sent</strong> {/* כותרת ההודעה */}
          </Toast.Header>
          <Toast.Body>Thank you for your recommendation!</Toast.Body> {/* גוף ההודעה */}
        </Toast>
      </ToastContainer>
    </Container>
  );
};

// מייצא את הקומפוננטה כך שתוכל לשמש בקובץ אחר
export default RecommendationForm;
