import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const HomeBoutiqueEvents = () => {
  return (
    <div>
        <h1>Home Boutique Events</h1>
        <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default HomeBoutiqueEvents;
