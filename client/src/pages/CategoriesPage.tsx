import { fetchImagesByCategory, Image } from "../api/FetchingImages";
import { deleteImage } from "../api/DeleteImages";
import { useLoaderData, useParams } from "react-router-dom";
import { translateKeyValue } from "../data/index";
import type { Params } from "react-router-dom";
import { useEffect, useState } from "react";
import PostPopup from "../garbage/PostPopup2";
import PlusButton from "../components/PlusButton";
import { Container, Row, Col, Card } from "react-bootstrap";
import GalleryTabs from "../components/GalleryTabs";
import { fetchPostsByCategory } from "../api/FetchingPosts";
import '../styles/Categories.css';


export default function Categories() {

  const imagesFromDB = useLoaderData();
  const { category } = useParams<{ category: string }>();

  // סטייטים לניהול המידע
  const [images, setImages] = useState<Image[]>(imagesFromDB);
  const [displayMode, setDisplayMode] = useState<'images' | 'posts'>('images');
  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false); // סטייט חדש לניהול מצב טעינת הפוסטים
  const [selectedPost, setSelectedPost] = useState(null);

  // עדכון התמונות כאשר משתנה ה-loader
  useEffect(() => {
    setImages(imagesFromDB);
  }, [imagesFromDB]);

  // טעינת פוסטים - רק בפעם הראשונה שעוברים למצב פוסטים
  useEffect(() => {
    const loadPosts = async () => {
      if (displayMode === 'posts' && !isPostsLoaded) {
        try {
          const fetchedPosts = await fetchPostsByCategory(category!);
          setPosts(fetchedPosts);
          setIsPostsLoaded(true); // מסמן שהפוסטים נטענו
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    loadPosts();
  }, [displayMode, category, isPostsLoaded]);

  // פונקציה למחיקת תמונה
  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId);
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Container className="categories-container">
      <div className="categories-header">
        <h1>{translateKeyValue(category as string)}</h1>
      </div>
      
      <GalleryTabs
        images={images}
        deleteImg={handleDelete}
        posts={posts}
        setDisplayMode={setDisplayMode}
      />
  
      {selectedPost && (
        <PostPopup
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
      <PlusButton currentCategory={category} />
    </Container>
  );
}

export async function loader({ params }: { params: Params<string>}) {
  const category = params.category;
  if (!category) {
    throw new Error('No category specified.');
  }

  try {
    return await fetchImagesByCategory(category);
  } catch (error) {
    console.error('Error in loader:', error);
    return [];
  }
}