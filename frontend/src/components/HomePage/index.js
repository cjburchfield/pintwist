import React, { useState, useEffect } from "react";

import "./HomePage.css";

const HomePage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imageSet, setImageSet] = useState('batch-one');
  
    const handleDotClick = (index) => {
      setActiveIndex(index);
      setImageSet(imageSet === 'batch-one' ? 'batch-two' : 'batch-one');
    };
  
    const batchOneImages = [
      'https://pintwist-seeds.s3.amazonaws.com/1.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/2.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/3.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/4.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/5.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/6.jpg',
    ];
  
    const batchTwoImages = [
      'https://pintwist-seeds.s3.amazonaws.com/7.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/8.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/9.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/10.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/11.jpg',
      'https://pintwist-seeds.s3.amazonaws.com/12.jpg',
    ];
  
    const imageSets =
      imageSet === 'batch-one' ? chunkArray(batchOneImages, 3) : chunkArray(batchTwoImages, 3);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((activeIndex + 1) % imageSets.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [activeIndex, imageSets.length]);
  
    function chunkArray(array, size) {
      const chunkedArray = [];
      let index = 0;
      while (index < array.length) {
        chunkedArray.push(array.slice(index, size + index));
        index += size;
      }
      return chunkedArray;
    }
  
    return (
      <div className="image-slider-container">
        {imageSets.map((imageSet, setIndex) => (
          <div key={setIndex} className={`image-container ${setIndex === activeIndex ? 'active' : ''}`}>
            {imageSet.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image-${index}`}
                className={`image ${setIndex === activeIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        ))}
        <div className="dot-container">
          {imageSets.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default HomePage;
  

// import React, { useState, useEffect } from "react";

// import "./HomePage.css";

// const HomePage = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [imageSet, setImageSet] = useState('weeknight-dinner');
  
//     const handleDotClick = (index) => {
//       setActiveIndex(index);
//       setImageSet(imageSet === 'weeknight-dinner' ? 'home-decor' : 'weeknight-dinner');
//     };
  
//     const weeknightDinnerImages = [
//       'https://pintwist-seeds.s3.amazonaws.com/1.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/2.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/3.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/4.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/5.jpg',
//     ];
  
//     const homeDecorImages = [
//       'https://pintwist-seeds.s3.amazonaws.com/6.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/7.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/8.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/9.jpg',
//       'https://pintwist-seeds.s3.amazonaws.com/10.jpg',
//     ];
  
//     const imageSets =
//       imageSet === 'weeknight-dinner' ? chunkArray(weeknightDinnerImages, 3) : chunkArray(homeDecorImages, 3);
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setActiveIndex((activeIndex + 1) % imageSets.length);
//       }, 3000);
  
//       return () => clearInterval(interval);
//     }, [activeIndex, imageSets.length]);
  
//     function chunkArray(array, size) {
//       const chunkedArray = [];
//       let index = 0;
//       while (index < array.length) {
//         chunkedArray.push(array.slice(index, size + index));
//         index += size;
//       }
//       return chunkedArray;
//     }
  
//     return (
//         <div className="image-slider-container">
//           {imageSets.map((imageSet, setIndex) => (
//             <div key={setIndex}>
//               <h2 className="image-set-header">
//                 {imageSet === weeknightDinnerImages ? "Weeknight Dinners" : "Home Decor"}
//               </h2>
//               <div className={`image-container ${setIndex === activeIndex ? 'active' : ''}`}>
//                 {imageSet.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`image-${index}`}
//                     className={`image ${setIndex === activeIndex ? 'active' : ''}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//           <div className="dot-container">
//             {imageSets.map((_, index) => (
//               <div
//                 key={index}
//                 className={`dot ${index === activeIndex ? 'active' : ''}`}
//                 onClick={() => handleDotClick(index)}
//               />
//             ))}
//           </div>
//         </div>
//       );
//   };
  
//   export default HomePage;
