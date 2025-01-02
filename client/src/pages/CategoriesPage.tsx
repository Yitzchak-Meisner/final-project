import { fetchImagesByCategory, Image } from "../api/FetchingImages";
import { deleteImage } from "../api/DeleteImages";
import { useLoaderData, useParams } from "react-router-dom";
import { translateKeyValue } from "../data/index";
import type { Params } from "react-router-dom";
import { useEffect, useState } from "react";
import PostPopup from "../components/PostPopup";
import PlusButton from "../components/PlusButton";
import { Container, Row, Col, Card } from "react-bootstrap";
import GalleryTabs from "../garbage/lovable/GalleryTabs";
import { fetchPostsByCategory } from "../api/FetchingPosts";


export default function Categories() {

  const imagesFromDB = useLoaderData();

  const { category } = useParams<{ category: string }>(); // שליפת הקטגוריה ישירות מה-URL
  
  const [images, setImages] = useState<Image[]>(imagesFromDB);
  const [displayMode, setDisplayMode] = useState<'images' | 'posts'>('images');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // שמירת הפוסט שנבחר עבור הפופאפ
  
  
  useEffect(() => {
    setImages(imagesFromDB);
  } , [imagesFromDB]);


  useEffect(() => {
    if (displayMode === 'posts') {
        const fetchPosts = async () => {
        console.log( "Fetching posts for category:", category);
        const posts = await fetchPostsByCategory(category!);
        console.log("Fetched posts:", posts);
        setPosts(posts);
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
  

  return (
    <Container style={{ paddingTop: '100px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{translateKeyValue(category)}</h1>
      </div>
      
      <GalleryTabs
        images={images}
        deleteImg={handleDelete}
        posts={posts}
        setDisplayMode={setDisplayMode}
      />
  
      {selectedPost && ( // הצגת הפופאפ אם יש פוסט שנבחר
        <PostPopup
          post={selectedPost}
          onClose={() => setSelectedPost(null)} // סגירת הפופאפ
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


  return fetchImagesByCategory(category);
}
