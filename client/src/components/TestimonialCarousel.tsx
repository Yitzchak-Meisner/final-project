import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from '../styles/TestimonialCarousel.module.css';

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "An absolutely incredible experience. The attention to detail is remarkable.",
    author: "Sarah Johnson",
    role: "Creative Director",
  },
  {
    text: "The design quality exceeded our expectations. Truly outstanding work.",
    author: "Michael Chen",
    role: "Product Manager",
  },
  {
    text: "Innovative solutions delivered with exceptional professionalism.",
    author: "Emma Thompson",
    role: "Marketing Director",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselInner}>
        <div className={styles.carouselTrack}>
          <div className={styles.carouselSlides}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${styles.carouselSlide} ${index === current ? styles.active : ''}`}
              >
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>{testimonial.text}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorInfo}>
                      <p className={styles.authorName}>{testimonial.author}</p>
                      <p className={styles.authorRole}>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prev}
          className={`${styles.carouselButton} ${styles.prevButton}`}
          aria-label="Previous testimonial"
        >
          <ArrowLeft className={styles.arrowIcon} />
        </button>
        <button
          onClick={next}
          className={`${styles.carouselButton} ${styles.nextButton}`}
          aria-label="Next testimonial"
        >
          <ArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;