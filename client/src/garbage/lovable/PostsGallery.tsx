import { useState } from 'react'; 
// מייבא את ה-hook של React שנקרא useState, המאפשר לנהל מצב (state) בתוך קומפוננטה.

import { Card, Row, Col, Container } from 'react-bootstrap'; 
// מייבא רכיבים מ-react-bootstrap ליצירת עיצוב מסודר עם מערכת גריד ורכיבי כרטיסיות.

import PostPopup from './PostPopup'; 
// מייבא רכיב מותאם אישית בשם PostPopup, אשר כנראה מציג תוכן הפוסט בחלון פופאפ.

interface Post { 
  id: string;
  title: string;
  content: string;
  images: string[];
}
// מגדיר את מבנה האובייקט של פוסט באמצעות TypeScript. הפוסט כולל מזהה, כותרת, תוכן ותמונות.

const PostsGallery: React.FC = ({ posts }) => { 
// מגדיר קומפוננטה בשם PostsGallery. React.FC מסמן שזהו רכיב React ב-TypeScript.

  const [selectedPost, setSelectedPost] = useState<Post | null>(null); 
  // משתנה מצב (state) עבור הפוסט שנבחר. מתחיל ב-null, כלומר שלא נבחר פוסט.

  const [showPopup, setShowPopup] = useState(false); 
  // משתנה מצב (state) שמנהל האם הפופאפ פתוח או סגור. מתחיל כ-false.

  // const posts: Post[] = [
  //   {
  //     id: "1",
  //     title: "Sample Post 1",
  //     content: "This is a sample post content that will be truncated if it's too long...",
  //     images: ["/placeholder.svg"],
  //   },
  //   // מערך של פוסטים לדוגמה. כל פוסט הוא אובייקט במבנה שתואם את הממשק Post.
  //   // ניתן להוסיף עוד פוסטים במערך.
  // ];

  const handlePostClick = (post: Post) => { 
    setSelectedPost(post); 
    // מעדכן את ה-state עם הפוסט שנלחץ עליו.
    setShowPopup(true); 
    // פותח את הפופאפ.
  };

  const handleClosePopup = () => { 
    setShowPopup(false); 
    // סוגר את הפופאפ.
    setSelectedPost(null); 
    // מאפס את הפוסט הנבחר.
  };

  return (
    <Container className="mt-4"> 
    {/* עוטף את כל הגלריה במיכל של react-bootstrap עם מרווח עליון */}
      
      <Row xs={1} md={2} lg={3} className="g-4"> 
      {/* יוצר גריד רספונסיבי שמסתגל לכמות עמודות בהתבסס על גודל המסך */}

        {posts.length === 0 ? ( // בדיקה אם אין פוסטים
            <p className="text-center">אין פוסטים להצגה</p>
          ) : (
            posts.map((post) => ( 
            // עובר על כל הפוסטים ומחזיר רכיב Col עבור כל אחד מהם.

              <Col key={post.id}> 
              {/* עוטף כל פוסט בעמודה. key משמש לייעול React בעת רינדור רשימות. */}
              
                <Card 
                  className="h-100" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => handlePostClick(post)}
                >
                {/* יוצר כרטיס עם גובה מלא וסמן "יד" כדי להראות שניתן ללחוץ עליו. בלחיצה על הכרטיס, תופעל הפונקציה handlePostClick עם הפרטים של הפוסט. */}

                  <div style={{ position: 'relative', paddingTop: '56.25%' }}> 
                  {/* יוצר תיבה שמבוססת על יחסי גובה/רוחב של 16:9 עבור התמונה. */}
                  
                    <Card.Img
                      variant="top"
                      src={post.images[0]}
                      alt={post.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {/* מציג את התמונה הראשונה של הפוסט. style מבטיח שהתמונה תכסה את כל השטח באופן פרופורציונלי. */}
                  
                  </div>

                  <Card.Header>
                    <Card.Title className="h5">{post.title}</Card.Title>
                  </Card.Header>
                  {/* מציג את כותרת הפוסט בתוך כותרת של הכרטיס. */}
                  
                  <Card.Body>
                    <Card.Text 
                      className="text-muted"
                      style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {post.description}
                    </Card.Text>
                  </Card.Body>
                  {/* מציג את תוכן הפוסט אך מגביל אותו לשלוש שורות עם סיום אוטומטי (...). */}
                
                </Card>
              </Col>
            ))
          )}
      </Row>
      
      {selectedPost && (
        <PostPopup
          post={selectedPost}
          show={showPopup}
          onClose={handleClosePopup}
        />
      )}
      {/* אם יש פוסט שנבחר, מציג את רכיב PostPopup עם פרטי הפוסט. */}
    
    </Container>
  );
};

export default PostsGallery; 
// מייצא את הרכיב כברירת מחדל כדי שניתן יהיה לייבא אותו בקובץ אחר.
