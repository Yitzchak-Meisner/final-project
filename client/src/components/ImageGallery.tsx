import { useState } from 'react'; 

import { Container, Row, Col, Button } from 'react-bootstrap'; 

// import { Heart } from 'lucide-react';

import ImagePopup from './ImagePopup'; 

import '../styles/ImageGallery.css';

export interface Image { 
  id: string;
  url: string;
  //liked: boolean;
}

interface ImageGalleryProps {
  images: Image[];
  deleteImg: (imageId: string) => Promise<void>;
}


const ImageGallery: React.FC<ImageGalleryProps> = ( { images , deleteImg } ) => { 
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); 
  
  // const [likedImages, setLikedImages] = useState<Set<string>>(new Set()); 

  // const handleLike = (imageId: string) => { 
  //   setLikedImages(prev => { 
  //     const newSet = new Set(prev);
  //     if (newSet.has(imageId)) {
  //       newSet.delete(imageId);
  //     } else {
  //       newSet.add(imageId);
  //     }
  //     return newSet;
  //   });
  // };

  return (
    <Container className="py-5">
    {images ? (
      <Row className="g-4">
        {images.map((image) => (
          <Col key={image.id} xs={12} md={6} lg={4}>
            <div 
              className="position-relative gallery-item" 
              style={{ cursor: 'pointer' }}
            >
              <div 
                className="ratio ratio-4x3"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt=""
                  className="object-fit-cover rounded"
                />
              </div>
              {/* <Button
                variant="light"
                className="position-absolute top-0 end-0 m-3 rounded-circle p-2 gallery-like-button"
                onClick={(e) => { 
                  e.stopPropagation();
                  handleLike(image.id);
                }}
              >
                <Heart 
                  className={likedImages.has(image.id) ? 'text-danger fill-danger' : 'text-secondary'}
                  size={20}
                />
              </Button> */}
            </div>
          </Col>
        ))}
      </Row>
      
    ) : (
      <p>לא קיים תמונות</p>
    )}
      {selectedImage && ( 
        <ImagePopup
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          //onLike={() => handleLike(selectedImage.id)}
          //isLiked={likedImages.has(selectedImage.id)}
          show={!!selectedImage}
        />
      )}
    </Container>
  );
};

export default ImageGallery;
