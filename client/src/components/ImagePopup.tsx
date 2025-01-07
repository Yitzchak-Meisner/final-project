import { Modal, Button } from 'react-bootstrap';

import { Heart, X } from 'lucide-react';

import '../styles/ImagePopup.css';

interface Image {
  id: string;
  url: string;
  //liked: boolean;
}
interface ImagePopupProps {
  image: Image;
  onClose: () => void;
  //onLike: () => void;
  //isLiked: boolean;
  show: boolean;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ image, onClose, show }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="xl"
      className="image-popup-modal"
    >
      <Modal.Body className="p-0 position-relative">
        <div className="ratio ratio-16x9">
          <img
            src={image.url}
            alt=""
            className="object-fit-cover w-100 h-100 rounded"
          />
        </div>
        
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-3 rounded-circle p-2"
          onClick={onClose}
        >
          <X className="text-secondary" size={20} />
        </Button>
        
        {/* <Button
          variant="light"
          className="position-absolute top-0 start-0 m-3 rounded-circle p-2"
          onClick={onLike}
        >
          <Heart 
            className={isLiked ? 'text-danger fill-danger' : 'text-secondary'} 
            size={20}
          />
        </Button> */}
      </Modal.Body>
    </Modal>
  );
};

export default ImagePopup;
