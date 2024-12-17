import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";
import { fetchImagesByCategory } from "../api/FetchingImages";
import { useLoaderData } from "react-router-dom";
import CardsDisplay from "../components/CardsDisplay";
import { navLinks } from "../data/index";

export default function Categories() {
    
  const images = useLoaderData();

  const category = images?.[0]?.category;

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
      <CardsDisplay images={images} />

      <PlusButton 
        popupTitle="העלאת תמונה"
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export async function loader({ params }: { params: { category: string }}) {
  const category = params.category;
  return fetchImagesByCategory(category);
}
