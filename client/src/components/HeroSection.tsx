import { useState, useEffect } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styles/HeroSection.css';

const images = [
  '/4.jpg',
  '/5.jpg',
  '/6.jpg'
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  let navigate = useNavigate();

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
      <div className="slides-container">
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
          <div className="slide-overlay" />
          </div>
      ))}
      </div>
      

      <Container className="hero-content">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <div className="content-box">
              <h1 className="main-title">ציפי שטיין - עיצוב אירועים</h1>
              <p className="subtitle">יוצרים רגעים בלתי נשכחים</p>
              <div className="button-group">
                <Button 
                  variant="primary" 
                  className="hero-btn primary"
                  onClick={() => navigate("/about")}
                >
                  אודותינו
                </Button>
                <Button
                  variant="outline-primary"
                  className="hero-btn secondary"
                  onClick={() => navigate("/contact-us")}
                >
                  ליצירת קשר
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <button className="nav-btn prev" onClick={prevImage}>
        <ArrowLeft size={24} />
      </button>
      <button className="nav-btn next" onClick={nextImage}>
        <ArrowRight size={24} />
      </button>


      {/* <Container className="hero-content">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <div className="content-box">
              <h1 className="main-title">ציפי שטיין - עיצוב אירועים</h1>
              <p className="subtitle">יוצרים רגעים בלתי נשכחים</p>
              <div className="button-group">
                <Button 
                  variant="primary" 
                  className="hero-btn primary"
                  onClick={() => navigate("/about")}
                >
                  אודותינו
                </Button>
                <Button
                  variant="outline-primary"
                  className="hero-btn secondary"
                  onClick={() => navigate("/contact-us")}
                >
                  ליצירת קשר
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <button className="nav-btn prev" onClick={prevImage}>
        <ArrowLeft size={24} />
      </button>
      <button className="nav-btn next" onClick={nextImage}>
        <ArrowRight size={24} />
      </button> */}
    </div>
  );
};

export default HeroSection;