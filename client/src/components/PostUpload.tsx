import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import axios from 'axios';
import '../styles/ImageUpload.css';
import { links } from '../data';

// interface PostUploadProps {
//   category: string;
// }

const PostUpload: React.FC<{ defaultCategory?: string }> = ({ defaultCategory }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: defaultCategory || '',
      images: [] as string[]
    });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || formData.images.length === 0) {
      setMessage('נא למלא את כל השדות ולהעלות לפחות תמונה אחת');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/posts/create-posts', {
        ...formData,
        displayCategory: undefined
      });
      setMessage('הפוסט נוצר בהצלחה!');
      setFormData({ title: '', description: '', category: '', images: [] });
    } catch (error) {
      setMessage('שגיאה ביצירת הפוסט');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>כותרת</Form.Label>
        <Form.Control
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="הזן כותרת לפוסט"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>תיאור</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="הזן תיאור לפוסט"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>קטגוריה</Form.Label>
        <Form.Select 
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
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
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleImageUpload(e.dataTransfer.files);
        }}
      >
        {formData.images.length > 0 ? (
          <div className="images-preview">
            {formData.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="preview-image" />
            ))}
          </div>
        ) : (
          <>
            <Upload className="upload-icon" />
            <p>גרור תמונות לכאן או לחץ לבחירת תמונות</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />
          </>
        )}
      </div>

      <Button type="submit" className="mt-3" disabled={loading}>
        {loading ? 'יוצר פוסט...' : 'צור פוסט'}
      </Button>

      {message && (
        <Alert variant={message.includes('שגיאה') ? 'danger' : 'success'} className="mt-3">
          {message}
        </Alert>
      )}
    </Form>
  );
};

export default PostUpload;