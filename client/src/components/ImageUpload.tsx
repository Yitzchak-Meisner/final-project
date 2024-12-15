import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload } from 'lucide-react';
import axios from 'axios';
import styles from '../styles/ImageUpload.module.css';

const ImageUpload = () => {
  const location = useLocation();
  const category = location.pathname.split('/').filter(Boolean).pop();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      setMessage('');
      handleUpload(file);
    } else {
      setMessage('נא לבחור קובץ תמונה, ולא ' + file?.type);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('dateNow', new Date().toISOString());
    
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('התמונה הועלתה בהצלחה!');
    } catch (error) {
      setMessage('שגיאה בהעלאת התמונה: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
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

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>העלאת תמונה לקטגוריה: {category}</h2>

      <div
        className={`${styles.dropzone} 
          ${isDragging ? styles.dropzoneDragging : ''} 
          ${loading ? styles.dropzoneDisabled : ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className={styles.hiddenInput}
        />

        {selectedFile ? (
          <div>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="תצוגה מקדימה"
              className={styles.previewImage}
            />
            <div className={styles.fileInfo}>
              <p>שם הקובץ: {selectedFile.name}</p>
              <p>גודל: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        ) : (
          <div>
            <Upload className={styles.uploadIcon} />
            <p className={styles.uploadText}>
              גרור תמונה לכאן או לחץ לבחירה
            </p>
          </div>
        )}

        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingText}>מעלה...</div>
          </div>
        )}
      </div>

      {message && (
        <p className={`${styles.message} ${
          message.includes('שגיאה') ? styles.errorMessage : styles.successMessage
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;