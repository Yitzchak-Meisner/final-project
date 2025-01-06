import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import '../styles/HeroSection.css';

const images = [
  '/4.jpg',
  '/5.jpg',
  '/6.jpg'
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="hero-container">
      {images.map((src, index) => (
        <div
          key={src}
          className={`slide ${index === currentImage ? 'active' : ''}`}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="overlay" />
        </div>
      ))}
      
      <div className="content">
        <div className="text-content">
          <h1>Discover Excellence</h1>
          <p>Experience design at its finest</p>
          <button className="explore-button">
            Explore Now
          </button>
        </div>
      </div>

      <button
        onClick={prevImage}
        className="nav-button prev"
      >
        <ArrowLeft className="arrow" />
      </button>
      <button
        onClick={nextImage}
        className="nav-button next"
      >
        <ArrowRight className="arrow" />
      </button>
    </div>
  );
};

export default HeroSection;