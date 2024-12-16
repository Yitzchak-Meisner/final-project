import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";
import { fetchImagesByCategory } from "../api/FetchingImages";
import { useLoaderData } from "react-router-dom";
import Display from "../components/Display";

export default function BatMitzvah() {

  const images = useLoaderData();
  console.log(images);
  console.log(Image)

  return (
    <div>
      <h1>Bat Mitzvah</h1>

      {/* הצגת התמונות */}
      <Display images={images} />


      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export async function loader({ params }: { params: { category: string }}) {
  const category = params.category || "bat-mitzvah";
  return fetchImagesByCategory(category);
}
