import PlusButton from '../components/PlusButton';
import HeroSection from '../components/HeroSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
  return (
    <div>
      {/* <h1>Home Page</h1> */}
      <HeroSection />
      <LatestPosts />
      <TestimonialCarousel />
      <PlusButton />
    </div>
  )
}

export default Home;
