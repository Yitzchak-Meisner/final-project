// src/components/ImageUpload.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ImageUpload = () => {
  const location = useLocation(); // קבלת המיקום הנוכחי מהנתיב
  const category = location.pathname.split('/').filter(Boolean).pop(); // חילוץ המילה האחרונה
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // טיפול בבחירת קובץ
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      // יצירת תצוגה מקדימה של התמונה
      const reader = new FileReader();     
      console.log(reader);
      
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      setMessage('');
    } else {
      setMessage('please select an image file, not a ' + file.type);
    }
  };

  // טיפול בהעלאת הקובץ
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('category', category);
    formData.append('dateNow', new Date().toISOString());
    
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value); // מדפיס כל מפתח וערך
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('the image was uploaded successfully!');

      // איפוס הטופס
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setMessage('error uploading image: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>upload an image for category: {category}</h2>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>

      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="preview"
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        </div>
      )}

      {selectedFile && (
        <div>
          <p>file name: {selectedFile.name}</p>
          <p>file size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;

