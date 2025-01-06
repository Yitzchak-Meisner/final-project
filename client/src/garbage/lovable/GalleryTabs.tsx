import { Tabs, Tab } from 'react-bootstrap'; 
// ייבוא רכיבים של Bootstrap עבור טאבים.

import ImageGallery from './ImageGallery'; 
// ייבוא קומפוננטת גלריית תמונות מקובץ מקומי בשם ImageGallery.

import PostsGallery from './PostsGallery'; 
// ייבוא קומפוננטת גלריית פוסטים מקובץ מקומי בשם PostsGallery.

const GalleryTabs: React.FC = ( { images, deleteImg, posts, setDisplayMode }) => { 
// יצירת קומפוננטה בשם GalleryTabs שמשתמשת ב-TypeScript (React.FC מציין שהיא פונקציית React).

  return ( 
    // הקומפוננטה מחזירה JSX שמתאר את המבנה של התצוגה.
    <div className="container pt-5"> 
      {/* מעטפת המכילה את הטאבים עם סגנון Bootstrap הכולל מרווח עליון (pt-5). */}

      <Tabs
        defaultActiveKey="photos" 
        // המפתח (key) המוגדר כברירת מחדל לטאב שייבחר אוטומטית הוא "photos".


        onSelect={(key) => {
          console.log("Switched to tab:", key); // הדפס למעקב
          setDisplayMode(key === "photos" ? "images" : "posts");
        }}


        className="mb-3 justify-content-center" 
        // מחלקה שמוסיפה מרווח תחתון (mb-3) וממרכזת את הטאבים.

        fill 
        // התכונה `fill` גורמת לטאבים להתפרש על כל רוחב הקונטיינר.
      >

        <Tab eventKey="photos" title="Photos"> 
          {/* // הגדרת טאב עם מפתח זיהוי "photos" וכותרת "Photos". */}
          <ImageGallery images={images} deleteImg={deleteImg} /> 
          {/* // קומפוננטה המציגה גלריית תמונות בתוך הטאב הזה. */}
        </Tab>

        <Tab eventKey="posts" title="Posts"> 
          {/* // הגדרת טאב נוסף עם מפתח זיהוי "posts" וכותרת "Posts". */}
          <PostsGallery posts={posts}/> 
          {/* // קומפוננטה המציגה גלריית פוסטים בתוך הטאב הזה. */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default GalleryTabs; 
// ייצוא הקומפוננטה GalleryTabs כברירת מחדל כך שניתן יהיה להשתמש בה בקבצים אחרים.