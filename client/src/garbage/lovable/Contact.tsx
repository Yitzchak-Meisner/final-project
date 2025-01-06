// מייבא את הרכיבים Tabs ו-Tab מתוך הספרייה react-bootstrap, שמשמשים ליצירת טאבים בעיצוב Bootstrap
import { Tabs, Tab } from 'react-bootstrap'; 

// מייבא רכיב מותאם אישית בשם ContactForm מתוך תיקיית components
import ContactForm from './ContactForm'; 

// מייבא רכיב מותאם אישית נוסף בשם RecommendationForm מתוך תיקיית components
import RecommendationForm from './RecommendationForm'; 

// יוצר רכיב בשם Contact, המוגדר כרכיב מסוג TypeScript עם טיפוס React.FC (Function Component)
const Contact: React.FC = () => { 
  return (
    // מחזיר JSX שמייצג את מבנה ה-HTML של הרכיב
    <div className="container pt-5"> 
      {/* משתמש ברכיב Tabs של react-bootstrap כדי ליצור סט של טאבים */}
      <Tabs
        defaultActiveKey="contact" // מגדיר שברירת המחדל היא הטאב הראשון (contact)
        id="contact-tabs" // נותן מזהה ייחודי למערכת הטאבים
        className="mb-3 justify-content-center" // מוסיף מחלקות CSS לשוליים ולמרכז הטאבים
        style={{ maxWidth: '400px', margin: '0 auto' }} // מגדיר רוחב מקסימלי ומרכז את הטאבים
      >
        {/* יוצר טאב ראשון עם המפתח eventKey "contact" וכותרת "Contact" */}
        <Tab eventKey="contact" title="Contact"> 
          {/* ברגע שהטאב נבחר, מוצג רכיב ContactForm */}
          <ContactForm /> 
        </Tab>
        {/* יוצר טאב שני עם המפתח eventKey "recommendation" וכותרת "Recommendation" */}
        <Tab eventKey="recommendation" title="Recommendation"> 
          {/* ברגע שהטאב נבחר, מוצג רכיב RecommendationForm */}
          <RecommendationForm /> 
        </Tab>
      </Tabs>
    </div>
  );
};

// מייצא את רכיב Contact כדי שניתן יהיה להשתמש בו בקבצים אחרים
export default Contact; 
