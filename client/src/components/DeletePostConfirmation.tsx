import { Modal, Button } from 'react-bootstrap';

interface DeletePostConfirmationProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (keepImages: boolean) => void;
}

const DeletePostConfirmation: React.FC<DeletePostConfirmationProps> = ({
  show,
  onHide,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>אישור מחיקת פוסט</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>האם ברצונך למחוק את הפוסט יחד עם כל התמונות או להשאיר את התמונות?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ביטול
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onConfirm(false)}
        >
          מחק הכל
        </Button>
        <Button 
          variant="warning" 
          onClick={() => onConfirm(true)}
        >
          השאר תמונות
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePostConfirmation;