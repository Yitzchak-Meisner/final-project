import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Home from './pages/HomePage';
import TableCenterpieces from './pages/TableCenterpiecesPage';
import Bars from './pages/BarsPage';
import FloorBar from './pages/FloorBarPage';
import TableBar from './pages/TableBarPage';
import HomeBoutiqueEvents from './pages/HomeBoutiqueEventsPage';
import LuxuryEvents from './pages/LuxuryEventsPage';
import BatMitzvah, { loader as batMitzvahLoader } from "./pages/BatMitzvahPage";
import AboutUs from './pages/AboutUsPage';
import ContactUs from './pages/ContactUsPage';
import NavbarComponent from './components/Navbar';
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
      { path: '/', element: <Home /> },
      { path: 'table-centerpieces', element: <TableCenterpieces /> },
      {
        path: 'bars',
        element: <Bars />,
        children: [
          { path: 'floor-bar', element: <FloorBar /> },
          { path: 'table-bar', element: <TableBar /> },
        ],
      },
      { path: 'home-boutique-events', element: <HomeBoutiqueEvents /> },
      { path: 'luxury-events', element: <LuxuryEvents /> },
      { path: 'bat-mitzvah', element: <BatMitzvah />, loader: batMitzvahLoader },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: '*', element: <div>Page Not Found</div> },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
