import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const LuxuryEvents = () => {
  return (
    <div>
      <h1>Luxury Events</h1>
      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default LuxuryEvents
