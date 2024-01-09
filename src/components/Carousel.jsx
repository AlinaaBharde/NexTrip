import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const feedbackData = [
    {
      text: "Great product! I love using it every day.",
      author: "John Doe",
    },
    {
      text: "Amazing customer support. They were very helpful.",
      author: "Jane Smith",
    },
    {
      text: "The features are fantastic. Exceeded my expectations.",
      author: "Bob Johnson",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? feedbackData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === feedbackData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="feedback-carousel">
      <button onClick={handlePrev}>&lt;</button>
      <div className="feedback-content">
        <p>{feedbackData[currentIndex].text}</p>
        <p>- {feedbackData[currentIndex].author}</p>
      </div>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default Carousel;
