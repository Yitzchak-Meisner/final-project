import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Upload } from 'react-bootstrap-icons'; // שימוש באייקון מ-react-bootstrap
import '../styles/ImageUpload.css'; // הקובץ עם ה-CSS החדש

const UploadImageComponent = () => {
  const [image, setImage] = useState(null); // מחרוזת Base64
  const [loading, setLoading] = useState(false); // בודק אם קובץ נטען
  const [message, setMessage] = useState(''); // state להצגת הודעות
  const [isDragging, setIsDragging] = useState(false); // בודק אם קובץ נגרר מעל האזור
  const fileInputRef = useRef(null);
  const { category } = useParams();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader(); // יצירת אובייקט FileReader לקריאת הקובץ
      reader.onloadend = () => { // פונקציה שפועלת כאשר קריאת הקובץ מסתיימת
        setImage(reader.result); // שמירת תוכן הקובץ כתמונת Base64 ב-state 'image'
      };
      reader.readAsDataURL(file); // קריאת הקובץ והמרתו למחרוזת Base64
    } else {
      setMessage('Please select an image file.');
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }

    const payload = {
      image, // מחרוזת Base64
      category,
      uploadDate: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('Image uploaded successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnter = (e) => { //פונקציה זו מופעלת כאשר גוררים קובץ מעל האזור, היא מבטיחה שלא יבוצע ברירת מחדל, ומעדכנת את ה-state כדי להראות שהקובץ נמצא בתהליך גרירה.
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => { // פונקציה זו מופעלת כאשר הקובץ יוצא מאזור הגרירה, ומעדכנת את ה-state כדי לבטל את מצב הגרירה.
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => { // פונקציה זו מבטיחה שמצב גרירה פעיל ימשיך ולא יוביל לאירועים ברירת מחדל.
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => { // פונקציה זו מטפלת בשחרור הקובץ באזור הגרירה: היא מונעת פעולות ברירת מחדל, מבטלת את מצב הגרירה, קוראת את הקובץ הנגרר וממירה אותו למחרוזת Base64.
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // שמירת התמונה בפורמט Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    console.log("handleClick");
    
    fileInputRef.current?.click();
  };

  return (
    <div className="container">
      {/* כותרת */}
      <h1 className="title">Upload Image to category: {category}</h1>

      {/* אזור Drag & Drop */}
      <div
        className={`dropzone
          ${isDragging ? 'dropzoneDragging' : ''} 
          ${loading ? 'dropzoneDisabled' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hiddenInput"
          ref={fileInputRef}
        />
        {image ? (
          <div>
            <img
              src={image}
              alt="Preview"
              className="previewImage"
            />
            {/* <div className={fileInfo}>
              <p>שם הקובץ: {selectedFile.name}</p>
              <p>גודל: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div> */}
          </div>
        ) : (
          <div>
            <Upload className="uploadIcon" />
            <p className="uploadText">Drag & drop an image here or click to select one</p>
          </div>
        )}

        {loading && (
          <div className='loadingOverlay'>
            <div className='loadingText'>מעלה...</div>
          </div>
        )}
      </div>

        {/* כפתור העלאה */}
        <button className="btn btn-primary mt-3" onClick={handleUpload}>Upload</button>

      {message && (
        <p className={`message ${
          message.includes('שגיאה') ? 'errorMessage' : 'successMessage'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadImageComponent;
