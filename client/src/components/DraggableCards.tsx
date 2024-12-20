import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardsDisplay from "./CardsDisplay";
import axios from "axios";

const DraggableCards = ({ images = [], setImages }) => {
  // פונקציה שמופעלת בסיום פעולת הגרירה
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // אם הגרירה לא הסתיימה במקום תקין, אין צורך להמשיך
    if (!destination) return;

    // יצירת עותק של מערך התמונות והזזת התמונה שנגררה למיקום החדש
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, removed);

    // עדכון ה-state המקומי עם הסדר החדש של התמונות
    setImages(reorderedImages);

    // שליחת הנתונים החדשים לשרת לעדכון הסדר ב-DB
    // try {
    //   await axios.post("http://localhost:3000/api/images/update-order", {
    //     images: reorderedImages.map((img, index) => ({
    //       id: img.id, // מזהה התמונה
    //       order: index, // סדר התמונה החדש
    //     })),
    //   });
    //   console.log("Order updated successfully in DB");
    // } catch (error) {
    //   console.error("Error updating order:", error);
    // }
  };

  return (
    // הגדרת הקונטקסט של Drag & Drop
    <DragDropContext onDragEnd={onDragEnd}>
      {/* הגדרת אזור שניתן לגרור לתוכו */}
      <Droppable droppableId="images">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: "flex", flexWrap: "wrap", gap: "16px" }} // תיקון עיצוב
          >
            {/* מיפוי של התמונות להצגתן כפריטים נגררים */}
            {images.map((img, index) => (
              <Draggable key={img.id} draggableId={img.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style, margin: "8px" }} // עיצוב אלמנט נגרר
                  >
                    <CardsDisplay images={[img]} deleteImg={() => {}} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* שומר על מרווחים נכונים בעת גרירה */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableCards;
