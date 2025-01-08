import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Home from './pages/HomePage';
import Bars from './pages/BarsPage';
import Categories, { loader as categoriesLoader } from './pages/CategoriesPage';
import AboutUs from './pages/AboutUsPage';
import ContactUs from './pages/ContactUsPage';
import LogIn from './pages/LogInPage';
import MessagesDashboard, { loader as messagesLoader } from './pages/MessagesDashboardPage';
import { latestPostsLoader } from './components/LatestPosts';
import NavbarComponent from './components/Navbar';
import { setupTokenInterceptor } from './utils/tokenInterceptor';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => (
  <>
    <NavbarComponent />
    <Outlet /> {/* This renders the child route components */}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap the routes with the Layout component
    children: [
      { path: '/', element: <Home />, loader: latestPostsLoader },
      { path: 'bars', element: <Bars /> },
      { path: 'categories/:category', element: <Categories />, loader: categoriesLoader },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'login', element: <LogIn /> },
      { path: 'messages', element: <MessagesDashboard />, loader: messagesLoader },
      { path: '*', element: <div>Page Not Found</div> },
    ],
  },
]);

function App() {

  useEffect(() => {
    setupTokenInterceptor();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
