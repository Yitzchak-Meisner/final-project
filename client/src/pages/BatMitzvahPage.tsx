import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const BatMitzvah = () => {
  return (
    <div>
      <h1>Bat Mitzvah</h1>
      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default BatMitzvah
