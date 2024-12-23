import { useState, useRef } from 'react';
import { Upload } from 'react-bootstrap-icons';
import '../styles/ImageUpload.css';
import { links, translateKeyValue } from '../data';
import axios from 'axios';

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    displayCategory: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // קטגוריות קבועות
  const categories: string[] = Object.values(links);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'displayCategory') {
      const englishCategory = translateKeyValue(value);
      setFormData({
        ...formData,
        category: englishCategory || '', // שמירת המפתח באנגלית
        displayCategory: value, // שמירת הערך בעברית להצגה
      });
    } else {
      setFormData({ ...formData, [name]: value });}
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // המרת FileList למערך
    const fileReaders = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(fileReaders).then((images) => {
      setFormData({ ...formData, images });
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const fileReaders = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(fileReaders).then((images) => {
      setFormData({ ...formData, images });
    });
  };

  const handleSubmit = async (e) => {
    console.log('formData:', formData);
    
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || formData.images.length === 0) {
      setMessage('יש למלא את כל השדות ולהעלות לפחות תמונה אחת.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/posts/create-posts', {
        ...formData,
        displayCategory: undefined, // הסרת שדה התצוגה כדי שלא יישלח לשרת
        
      });

      console.log('Response:', response.data);
    
      setMessage('הפוסט נוצר בהצלחה!');
      setFormData({ title: '', description: '', category: '', displayCategory: '', images: [] });
    } catch (error) {
      console.error('Error:', error);
      setMessage('שגיאה בחיבור לשרת.');
    } finally {
      setLoading(false);
    }
    
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container">
      <h1 className="title">יצירת פוסט חדש</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">כותרת הפוסט</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="הכנס כותרת"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">תיאור הפוסט</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="הכנס תיאור"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">קטגוריה</label>
          <select
            id="category"
            name="displayCategory"
            value={formData.displayCategory}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div
          className={`dropzone ${isDragging ? 'dropzoneDragging' : ''} ${loading ? 'dropzoneDisabled' : ''}`}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hiddenInput"
            ref={fileInputRef}
          />
          {formData.images.length > 0 ? (
            <div className="previewImages">
              {formData.images.map((img, idx) => (
                <img key={idx} src={img} alt={`preview ${idx}`} className="previewImage" />
              ))}
            </div>
          ) : (
            <div>
              <Upload className="uploadIcon" />
              <p className="uploadText">גרור ושחרר תמונות או לחץ לבחירה</p>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'מעלה...' : 'צור פוסט'}
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes('שגיאה') ? 'errorMessage' : 'successMessage'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePostForm;
