import { useState } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import "./PostPopup.css";

interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
}

interface PostPopupProps {
  post: Post;
  show: boolean;
  onClose: () => void;
}

const PostPopup: React.FC<PostPopupProps> = ({ post, show, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <Modal 
      show={show} 
      onHide={onClose}
      size="xl"
      centered
      className="post-popup-modal"
    >
      <Container fluid className="p-0">
        <Row className="h-100">
          {/* Image Section */}
          <Col md={8} className="position-relative p-0">
            <div style={{ height: '80vh' }}>
              <img
                src={post.images[currentImageIndex]}
                alt=""
                className="w-100 h-100 object-fit-cover"
              />
              {post.images.length > 1 && (
                <>
                  <Button
                    variant="light"
                    onClick={previousImage}
                    className="position-absolute start-3 top-50 translate-middle-y rounded-circle bg-white bg-opacity-80"
                    style={{ padding: '0.5rem' }}
                  >
                    <ChevronLeft size={20} className="text-secondary" />
                  </Button>
                  <Button
                    variant="light"
                    onClick={nextImage}
                    className="position-absolute end-3 top-50 translate-middle-y rounded-circle bg-white bg-opacity-80"
                    style={{ padding: '0.5rem' }}
                  >
                    <ChevronRight size={20} className="text-secondary" />
                  </Button>
                </>
              )}
            </div>
          </Col>

          {/* Content Section */}
          <Col md={4} className="p-4">
            <div className="h-100 overflow-auto">
              <h2 className="mb-4 fw-semibold">{post.title}</h2>
              <p className="text-secondary">{post.content}</p>
            </div>
          </Col>
        </Row>

        {/* Close Button */}
        <Button
          variant="light"
          onClick={onClose}
          className="position-absolute top-3 end-3 rounded-circle bg-white bg-opacity-80"
          style={{ padding: '0.5rem' }}
        >
          <X size={20} className="text-secondary" />
        </Button>
      </Container>
    </Modal>
  );
};

export default PostPopup;