import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Test = () => {
  const [images, setImages] = useState([]);
  const [animalImages, setAnimalImages] = useState([]);
  const [birdImages, setBirdImages] = useState([]);
  const [randomImageIndex, setRandomImageIndex] = useState(null);
  const [shownImages, setShownImages] = useState([]);
  const [marks, setmarks] = useState(0)


  let maxImage = 10
  const [count, setCount] = useState(0)
  let navigate = useNavigate();

  useEffect(() => {
    if (count > 4) {
      navigate('/Result', { state: { score: marks, fullmarks: count } })
    }
    fetchImages(); // Initial fetch
  }, [count]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5005/list-images'); // Replace with your backend route for listing images
      setImages(response.data);
      setRandomImageIndex(getRandomIndex(response.data.length));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const getRandomIndex = (max) => {
    if (shownImages.length === maxImage) {
      // All images have been shown, reset shownImages
      setShownImages([]);
      return getRandomIndex(max);
    }

    const availableIndexes = Array.from({ length: max }, (_, i) => i);
    const remainingIndexes = availableIndexes.filter(
      (index) => !shownImages.includes(index)
    );

    const randomIndex = remainingIndexes[
      Math.floor(Math.random() * remainingIndexes.length)
    ];
    setShownImages([...shownImages, randomIndex]);
    return randomIndex;
  };

  const nextImage = () => {
    const nextIndex = getRandomIndex(images.length);
    setRandomImageIndex(nextIndex);
    setCount(count + 1)
  };

  const handleClick = (images) => {
    console.log(`Clicked on number: ${images[randomImageIndex]}`);
  };

  const handleDragStart = (event, images) => {
    event.dataTransfer.setData('text/plain', images.path);
    console.log(`Started dragging number: ${images.path}`);
  };

  const handleColumnDragOver = (event) => {
    event.preventDefault();
  };

  const handleAnimalColumnDrop = (event) => {
    event.preventDefault();
    const droppedImageUrl = event.dataTransfer.getData('text/plain');
    console.log(droppedImageUrl);
    if (droppedImageUrl) {
      if (droppedImageUrl.includes('Animal')) {
        setmarks(marks + 1)
        console.log(localStorage.getItem('marks'), marks);
      }
      console.log(`Dropped animal image: ${droppedImageUrl}`);
      setAnimalImages(prevAnimalImages => [...prevAnimalImages, droppedImageUrl]);
      nextImage();
    }
  };

  const handleBirdColumnDrop = (event) => {
    event.preventDefault();
    const droppedImageUrl = event.dataTransfer.getData('text/plain');
    if (droppedImageUrl) {
      if (droppedImageUrl.includes('Bird')) {
        setmarks(marks + 1)
        console.log(localStorage.getItem('marks'), marks);
      }
      console.log(`Dropped bird image: ${droppedImageUrl}`);
      setBirdImages(prevBirdImages => [...prevBirdImages, droppedImageUrl]);
      nextImage();
    }
  };

  return (
    <>
      <div className="container">
        <div className="column" onDragOver={handleColumnDragOver} onDrop={handleAnimalColumnDrop} >
          <h2>Animal</h2>
          {animalImages.map((image, index) => (
            <div className="image-item" key={index}>
              <img
                src={`http://localhost:5005/uploads/${image}`}
                alt={`Animal ${index}`}
                draggable="false"
                className="image"
              />
            </div>
          ))}
        </div>
        <div className="column">
          <h1>Image List</h1>
          {images.length > 0 && randomImageIndex !== null && (
            <div className="image-item" >
              <img
                draggable="true"
                src={`http://localhost:5005/uploads/${images[randomImageIndex].path}`} // Replace with your backend URL and port
                alt={`Uploaded ${randomImageIndex}`}
                onDragStart={(event) => handleDragStart(event, images[randomImageIndex])}
                onClick={() => handleClick(images[randomImageIndex])}
                className="image" // Apply the fade-in animation class
              />
            </div>
          )}
        </div>
        <div className="column" onDragOver={handleColumnDragOver} onDrop={handleBirdColumnDrop} >
          <h2>Bird</h2>
          {birdImages.map((image, index) => (
            <div className="image-item" key={index}>
              <img
                src={`http://localhost:5005/uploads/${image}`}
                alt={`Bird ${index}`}
                draggable="false"
                className="image"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Test
