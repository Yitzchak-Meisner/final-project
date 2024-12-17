import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const TableCenterpieces = () => {
  return (
    <div>
      <h1>Table Centerpieces</h1>
      <PlusButton 
        popupTitle="העלאת תמונה" 
        popupContent={<ImageUpload />}
      />
    </div>
  )
}

export default TableCenterpieces;
