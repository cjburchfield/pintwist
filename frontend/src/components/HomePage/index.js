import React, { useState, useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
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

  const imageSets = [batchOneImages, batchTwoImages];

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageSet, setImageSet] = useState(0);
  const [header, setHeader] = useState("home decor idea");
  const [title, setTitle] = useState("Get your next");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % imageSets[imageSet].length);
      if (activeIndex === imageSets[imageSet].length - 1) {
        setImageSet((imageSet + 1) % imageSets.length);
        setHeader(imageSet === 0 ? "home decor idea" : "daydream material");
        setTitle(imageSet === 0 ? "Get your next" : "...at least your new");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex, imageSet]);

  return (
    <>
      <div className="landing-header-holder">
        <div
          className={`landing-fixed-header ${
            title === "Get your next" ? "Get-your-next" : "at-least-your-new"
          }`}
        >
          {title}
        </div>
        <div
          className={`landing-header ${
            header === "home decor idea" ? "home-header" : "daydream-header"
          }`}
        >
          {header}
        </div>
      </div>
      <div className="image-slider-container">
        <div className="image-container">
          {imageSets[imageSet].map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`image-${index}`}
              className={`image ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
