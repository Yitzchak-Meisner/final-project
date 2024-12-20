import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";
import { fetchImagesByCategory, Image } from "../api/FetchingImages";
import { deleteImage } from "../api/DeleteImages";
import { useLoaderData } from "react-router-dom";
import CardsDisplay from "../components/CardsDisplay";
import DraggableCards from "../components/DraggableCards";
import { navLinks } from "../data/index";
import type { Params } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Categories() {

  const admin = localStorage.getItem('token');

  const imagesFromDB = useLoaderData();
  
  const [images, setImages] = useState<Image[]>(imagesFromDB);
  
  useEffect(() => {
    setImages(imagesFromDB);
  } , [imagesFromDB]);

  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId); // מחיקה מהשרת
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId)); // עדכון ה-State
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };


  const category = images[0].category;

  const categoryName = (() => {
    if (!category) return "טוען..."; // ערך ברירת מחדל בזמן טעינה
    if (category === "floor-bar") return "בר ריצפתי";
    if (category === "table-bar") return "בר שולחני";
    return navLinks.find((link) => link.path === `categories/${category}`)?.text || "קטגוריה לא נמצאה";
  })();


  return (
    <div>
      <h1>{categoryName}</h1>

      {/* הצגת התמונות */}
        {/* <DraggableCards images={images} setImages={setImages} /> */}
        <CardsDisplay images={images} deleteImg={handleDelete} />
        {admin ? <>
          <PlusButton 
          popupTitle="העלאת תמונה"
          popupContent={<ImageUpload />}
          />
        </> : null}
    </div>
  )
}

export async function loader({ params }: { params: Params<string>}) {
  const category = params.category;

  if (!category) {
    throw new Error('No category specified.');
  }


  return fetchImagesByCategory(category);
}
