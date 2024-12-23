import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const PostPopup = ({ post, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Body className="d-flex p-0" style={{ height: '80vh' }}>
        {/* תמונה בצד ימין */}
        <div className="w-50 bg-light position-relative">
          <img
            src={post.images[currentImageIndex]}
            alt={post.title}
            className="w-100 h-100 object-fit-contain"
          />
          {post.images.length > 1 && (
            <>
              <Button
                variant="light"
                onClick={prevImage}
                className="position-absolute start-0 top-50 translate-middle-y"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                variant="light"
                onClick={nextImage}
                className="position-absolute end-0 top-50 translate-middle-y"
              >
                <ChevronRight size={24} />
              </Button>
            </>
          )}
        </div>

        {/* תוכן בצד שמאל */}
        <div className="w-50 p-4 overflow-auto">
          <h2 className="h4 fw-bold mb-3">{post.title}</h2>
          <p className="text-muted">{post.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          סגור
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostPopup;
