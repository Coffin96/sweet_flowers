import React, { useState, useEffect } from 'react';
import '../styles/Slider.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { imageUrl: '/images/slide1.jpg', alt: 'Букет 1' },
    { imageUrl: '/images/slide2.jpg', alt: 'Букет 2' },
    { imageUrl: '/images/slide3.jpg', alt: 'Букет 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.imageUrl} alt={slide.alt} />
        </div>
      ))}
    </div>
  );
};

export default Slider;
