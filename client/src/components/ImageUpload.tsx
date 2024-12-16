import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UploadImageComponent = () => {
  const [image, setImage] = useState(null); // מחרוזת Base64
  const [uploadDate, setUploadDate] = useState(new Date());
  const location = useLocation();
  const category = location.pathname.split('/').filter(Boolean).pop();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // שמירה של מחרוזת Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const payload = {
      image, // מחרוזת Base64
      category,
      uploadDate: uploadDate.toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/upload', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Image uploaded successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {image && (
        <img
          src={image} // שימוש ב-Base64 כתמונה
          alt="Preview"
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}
    </div>
  );
};

export default UploadImageComponent;
