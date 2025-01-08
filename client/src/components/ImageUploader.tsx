import { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/UploadStyles.module.css';
import { Upload, Image, Images, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File | File[]) => void;
  multiple?: boolean;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, multiple = false, maxImages = 1 }) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = multiple
      ? imageFiles.slice(0, maxImages - images.length)
      : imageFiles.slice(0, 1);

    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prevImages => {
          const updatedImages = multiple
            ? [...prevImages, e.target?.result as string]
            : [e.target?.result as string];

          onImageUpload(updatedImages);

          return updatedImages;
        });
      };
  
      // onImageUpload(multiple ? images : images[0]);
      
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <Container
        onClick={handleClick}
        onDragStart={(e) => {e.preventDefault(); e.stopPropagation();}}
        onDrop={handleDrop}
        onDragOver={(e) => {e.preventDefault(); e.stopPropagation();}}
        style={{ width: '100%', minHeight: '200px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className={styles.dropzone}
        >
        <div className="d-flex align-items-center justify-content-center p-3">
          {images.length === 0 ? (
            <p className="text-center">
                לחץ או גרור {multiple ? `עד ${maxImages} תמונות` : 'תמונה אחת'} לכאן
            </p>
          ) : (
              !multiple ? (
                <div className="w-100 h-100 position-relative" onClick={(e) => e.stopPropagation()}>
                  <img src={images[0]} alt="uploaded" className="w-100 h-100" style={{ objectFit: 'contain' }}/>
                  <button onClick={() => removeImage(0)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}><X /></button>
                </div>
            ) : (
                <Row>
                  {images.length >= maxImages ? (
                    <p style={{ color: 'red', marginBottom: '10px' }}>
                      הגעת למגבלת התמונות המותרת.
                    </p>
                  ) : (
                    <p style={{ marginBottom: '10px' }}>
                      ניתן להוסיף {maxImages ? `עוד ${maxImages - images.length} תמונות` : 'תמונה אחת נוספת'}.
                    </p>
                  )}
                {images.map((image, index) => (
                <Col key={index} xs={6} md={4} lg={3} className="position-relative" onClick={(e) => e.stopPropagation()}>
                    <div className='position-relative'>
                      <img src={image} />
                      <button onClick={() => removeImage(index)} className="btn btn-danger btn-sm position-absolute" style={{ top: '5px', left: '5px' }}>x</button>
                    </div>
                </Col>
                ))}
            </Row>
            ))}
        </div>
      </Container>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        multiple={multiple}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;
