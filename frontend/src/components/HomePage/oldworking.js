
 //just need to revert back to 3 instead of 5 for batch images 
import React, { useState, useEffect } from "react";
import "./HomePage.css";

const batchOneImages = [
  "https://pintwist-seeds.s3.amazonaws.com/1.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/2.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/3.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/4.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/5.jpg",
];

const batchTwoImages = [
  "https://pintwist-seeds.s3.amazonaws.com/7.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/8.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/9.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/10.jpg",
  "https://pintwist-seeds.s3.amazonaws.com/11.jpg",
];

// const imageSets = [chunkArray(batchOneImages, 5), chunkArray(batchTwoImages), 5];
const imageSets = [chunkArray(batchOneImages, 5), chunkArray(batchTwoImages, 5)];


function chunkArray(array, size) {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
}

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageSet, setImageSet] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setImageSet(index % 2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % imageSets[imageSet].length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, imageSet]);

  return (
    <>
    <div className="landing-header-holder">
      <div className="landing-header">Get inspired</div>
    </div>
    <div className="image-slider-container">
      {imageSets[imageSet].map((imageSet, setIndex) => (
        <div
          key={setIndex}
          className={`image-container ${setIndex === activeIndex ? "active" : ""}`}
        >
          {imageSet.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image-${index}`}
              className={`image ${setIndex === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      ))}
      <div className="dot-container">
        {imageSets.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeIndex % 2 ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default HomePage;
