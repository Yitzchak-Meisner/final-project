// import ImageUpload from "../components/ImageUpload";
// import PlusButton from "../components/PlusButton";
import { fetchImagesByCategory, Image } from "../api/FetchingImages";
import { deleteImage } from "../api/DeleteImages";
import { useLoaderData } from "react-router-dom";
import CardsDisplay from "../components/CardsDisplay";
// import DraggableCards from "../components/DraggableCards";
import { navLinks } from "../data/index";
import type { Params } from "react-router-dom";
import { useEffect, useState } from "react";
import PostPopup from "../components/PostPopup";
import axios from "axios";


export default function Categories() {

  // const admin = localStorage.getItem('isAdmin');

  const imagesFromDB = useLoaderData();
  
  const [images, setImages] = useState<Image[]>(imagesFromDB);
  const [displayMode, setDisplayMode] = useState<'images' | 'posts'>('images');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // שמירת הפוסט שנבחר עבור הפופאפ

  
  useEffect(() => {
    setImages(imagesFromDB);
  } , [imagesFromDB]);


  useEffect(() => {
    if (displayMode === 'posts') {
      // Fetch posts for the current category
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/posts/posts', {
            params: { category: images[0]?.category }
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setPosts([]);
        }
      };
      fetchPosts();
    }
  }, [displayMode, images]);


  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId); // מחיקה מהשרת
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId)); // עדכון ה-State
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };


  const category = images[0]?.category;

  const categoryName = (() => {
    if (!category) return "טוען..."; // ערך ברירת מחדל בזמן טעינה
    if (category === "floor-bar") return "בר ריצפתי";
    if (category === "table-bar") return "בר שולחני";
    return navLinks.find((link) => link.path === `categories/${category}`)?.text || "קטגוריה לא נמצאה";
  })();


  // קומפוננטה (לייצוא בעתיד)
  // const PostCard = ({ post }) => (
  //   <div className="card mb-4">
  //     {post.images?.length > 0 && (
  //       <img 
  //         src={post.images[0]} 
  //         alt={post.title}
  //         className="card-img-top"
  //         style={{ height: '200px', objectFit: 'cover' }}
  //       />
  //     )}
  //     <div className="card-body">
  //       <h5 className="card-title">{post.title}</h5>
  //       <p className="card-text">{post.description}</p>
  //     </div>
  //   </div>
  // );


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{categoryName}</h1>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="displayMode"
            checked={displayMode === 'posts'}
            onChange={(e) => setDisplayMode(e.target.checked ? 'posts' : 'images')}
          />
          <label className="form-check-label" htmlFor="displayMode">
            {displayMode === 'posts' ? 'תצוגת פוסטים' : 'תצוגת תמונות'}
          </label>
        </div>
      </div>

      {displayMode === 'images' ? (
        <CardsDisplay images={images} deleteImg={handleDelete} />
      ) : (
        <div className="row">
          {posts.length === 0 ? ( // בדיקה אם אין פוסטים
            <p className="text-center">אין פוסטים להצגה</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="col-md-4"
                onClick={() => setSelectedPost(post)} // בלחיצה שומר את הפוסט שנבחר
              >
                {/* <PostCard post={post} /> */}
                <div className="card mb-4">
                  {post.images?.length > 0 && (
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedPost && ( // הצגת הפופאפ אם יש פוסט שנבחר
        <PostPopup
          post={selectedPost}
          onClose={() => setSelectedPost(null)} // סגירת הפופאפ
        />
      )}
    </div>
  );
}

export async function loader({ params }: { params: Params<string>}) {
  const category = params.category;

  if (!category) {
    throw new Error('No category specified.');
  }


  return fetchImagesByCategory(category);
}
