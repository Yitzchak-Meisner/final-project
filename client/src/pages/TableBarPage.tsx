import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const TableBar = () => {
  return (
    <div>
      <h1>Table Bar</h1>
      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default TableBar;
