import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const FloorBar = () => {
  return (
    <div>
      <h1>Floor Bar</h1>
      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default FloorBar
