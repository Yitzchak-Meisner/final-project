import { Modal } from 'react-bootstrap';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface PostPopupProps {
  post: Post;
  show: boolean;
  onClose: () => void;
}

const PostPopup: React.FC<PostPopupProps> = ({ post, show, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setCurrentImageIndex(0); // חזרה לתמונה הראשונה
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      setCurrentImageIndex(post.images.length - 1); // מעבר לתמונה האחרונה
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onClose}
      fullscreen
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <Modal.Header className="border-0 p-0">
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            zIndex: 1050,
            background: 'none',
            border: 'none',
            color: '#000',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <X size={24} />
        </button>
      </Modal.Header>
      
      <Modal.Body className="p-0 d-flex justify-content-center align-items-center">
        <div 
          className="d-flex" 
          style={{
            width: '95%',
            height: '90vh',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {/* אזור התמונה - עם חיצי ניווט */}
          <div 
            className="col-8" 
            style={{ 
              backgroundColor: '#f8f9fa',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* החץ השמאלי */}
            {post.images.length > 1 && (
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* התמונה */}
            {post.images[currentImageIndex] && (
              <img
                src={post.images[currentImageIndex]}
                alt={post.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            )}

            {/* החץ הימני */}
            {post.images.length > 1 && (
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* אינדיקטור לכמות התמונות */}
            {post.images.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
              >
                {currentImageIndex + 1} / {post.images.length}
              </div>
            )}
          </div>
          
          {/* אזור הטקסט - עם גלילה */}
          <div 
            className="col-4"
            style={{ 
              height: '100%',
              overflowY: 'auto',
              padding: '40px'
            }}
          >
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {post.title}
            </h2>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#666'
            }}>
              {post.description}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostPopup;