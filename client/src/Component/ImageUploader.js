import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('animal'); // Default category

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUpload = async () => {
    console.log(selectedFile);
    if (selectedFile) {

      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(category);
      formData.append('category', category);

      try {
        const response = await axios.post('http://localhost:5005/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="image-upload-container">
      <label className="upload-button">
        <span className="upload-icon">📷</span> Choose Image
        <input className="file-input" type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <div className="category-select">
        <label htmlFor="category">Select Category:</label>
        <select id="category" onChange={handleCategoryChange}>
          <option value="bird">Bird</option>
          <option value="animal">Animal</option>
        </select>
      </div>
      <button className="upload-button" onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUploader;
