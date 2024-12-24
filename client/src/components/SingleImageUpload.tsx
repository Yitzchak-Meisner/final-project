import { useState } from 'react';
import { Upload } from 'react-bootstrap-icons';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ImageUpload.css';
import { links } from '../data';

interface SingleImageUploadProps {
    defaultCategory?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({ defaultCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || '');
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setMessage('נא להעלות תמונה');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/pictures/upload', {
        image,
        defaultCategory
      });
      setMessage('התמונה הועלתה בהצלחה!');
      setImage(null);
    } catch (error) {
      setMessage('שגיאה בהעלאת התמונה');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
        <Form.Group className="mb-3">
        <Form.Label>קטגוריה</Form.Label>
        <Form.Select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">בחר קטגוריה</option>
          {Object.entries(links).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <div
        className={`dropzone ${isDragging ? 'dragover' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {image ? (
          <img src={image} alt="Preview" className="preview-image" />
        ) : (
          <>
            <Upload className="upload-icon" />
            <p>גרור תמונה לכאן או לחץ לבחירת תמונה</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />
          </>
        )}
      </div>
      
      <button type="submit" className="btn btn-primary mt-3" disabled={loading || !image}>
        {loading ? 'מעלה...' : 'העלה תמונה'}
      </button>
      
      {message && (
        <div className={`alert ${message.includes('שגיאה') ? 'alert-danger' : 'alert-success'} mt-3`}>
          {message}
        </div>
      )}
    </form>
  );
};


export default SingleImageUpload;