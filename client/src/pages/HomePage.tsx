import PlusButton from '../components/PlusButton';
import HeroSection from '../components/HeroSection';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Home = () => {
  return (
    <div>
      {/* <h1>Home Page</h1> */}
      <HeroSection />
      <TestimonialCarousel />
      <PlusButton />
    </div>
  )
}

export default Home;
