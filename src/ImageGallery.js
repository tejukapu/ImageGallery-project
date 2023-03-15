import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import "./ImageGallery.css";
import Masonry from "react-responsive-masonry"


const unsplash = createApi({
  accessKey: "NBSaL_LXRwHs2tynEEXBI0CxwHV7-xkaTYZVPeRZ-N8",
});

function ImageGallery() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  function searchImages() {
    unsplash.search
      .getPhotos({ query: query, perPage: 200 })
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
        } else {
          setPhotos(result.response.results);
        }
      });
  }

  useEffect(() => {
    searchImages();
  }, []);

  return (
    <div className="image-gallery">
        <input className="search "
          type="text"
          placeholder="Search for images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
        <button onClick={searchImages} className="button" >Search</button>
      
      <div className="image-grid">
      <Masonry columnsCount={3} gutter="10px">
        {photos.map((photo) => (
          <img className="images" key={photo.id} src={photo.urls.small} alt={photo.alt_description} 
          style={{Width :"100%", display:"block"}}/>
          ))}
       </Masonry>
      </div>
    </div>
  );
}

export default ImageGallery;

