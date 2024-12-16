import { Container, Row, Col } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const Display = ({ images }) => {
  // מערך שמכיל את ה-ID של התמונות שסומנו בלייק
  const [likedImages, setLikedImages] = useState(new Set());

  // פונקציה לטיפול בלחיצה על הלב
  const handleLike = (imageId) => {
    setLikedImages(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {images.map((img) => (
          <Col key={img.id} xs={12} sm={6} md={4} lg={4}>
            <div className="card h-100 shadow-sm position-relative">
              <div className="card-body">
                <img 
                  src={img.image_data} 
                  alt={img.category} 
                  className="img-fluid rounded" 
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover'
                  }}
                />
                <h5 className="card-title mt-3">{img.category}</h5>
                
                {/* כפתור הלב */}
                <button
                  onClick={() => handleLike(img.id)}
                  className="bottom-0 m-2 bg-transparent border-0"
                  style={{ cursor: 'pointer' }}
                >
                  <Heart
                    size={24}
                    fill={likedImages.has(img.id) ? '#ff0000' : 'none'}
                    color={likedImages.has(img.id) ? '#ff0000' : '#000000'}
                    style={{
                      transition: 'all 0.3s ease',
                      transform: likedImages.has(img.id) ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Display;