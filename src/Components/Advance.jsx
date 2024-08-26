import React, { useState, useRef } from 'react';

const Advance = ({currentSelectedDiv,uniqueID, setuniqueID , SelectDiv}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryRef = useRef();

  const apiKey = 'AIzaSyAhqaSvOjgLxgfzs9IkCp1LOqjtnX29VcU'; // Replace with your Google API Key
  const cx = 'e1b861b6c4379455f'; // Replace with your Custom Search Engine ID

  const searchImages = async () => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const query = queryRef.current.value;
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}&searchType=image`);
      const data = await response.json();
      
      if (data.items) {
        setImages(data.items);
      } else {
        setError('No images found.');
      }
    } catch (err) {
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
    console.log(image.link)
    imgHandle(image.link)
  };


  const imgHandle = (imglink) => {
    const div = document.getElementById(currentSelectedDiv);
    const img = document.createElement('img');
 
 
    img.id = `img-${uniqueID}`
    setuniqueID((pre)=> pre +1);
    img.className = 'clickable-div';
    img.onclick = SelectDiv;
    img.style.height = '200px';
    img.src = imglink

    div.appendChild(img)
  
    
  };


  return (
    <>
      <div id="search-container">
        <input
          type="text"
          ref={queryRef}
          placeholder="Search for images..."
        />
        <button onClick={searchImages}>Search</button>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div id="results">
        {images.map((image, index) => (
          <img onClick={() => handleImageClick(image)}
            key={index}
            src={image.link}
            alt={image.title || 'Image'}
            className="image-container"
            style={{ margin: '5px', maxWidth: '200px', maxHeight: '200px' }}
          />
        ))}
      </div>
    </>
  );
};

export default Advance;
