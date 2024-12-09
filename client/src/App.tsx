// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/HomePage';
import TableCenterpieces from './pages/TableCenterpiecesPage';
import Bars from './pages/BarsPage';
import FloorBar from './pages/FloorBarPage';
import TableBar from './pages/TableBarPage';
import HomeBoutiqueEvents from './pages/HomeBoutiqueEventsPage';
import LuxuryEvents from './pages/LuxuryEventsPage';
import BatMitzvah from './pages/BatMitzvahPage';
import AboutUs from './pages/AboutUsPage';
import ContactUs from './pages/ContactUsPage';


const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "table-centerpieces", element: <TableCenterpieces/>},
    {
      path: "bars", element: <Bars/>, children: [
        {path: "floor-bar", element: <FloorBar/>},
        {path: "table-bar", element: <TableBar/>}
      ]
    },
    {path: "home-boutique-events", element: <HomeBoutiqueEvents/>},
    {path: "luxury-events", element: <LuxuryEvents/>},
    {path: "bat-mitzvah", element: <BatMitzvah/>},
    {path: "about-us", element: <AboutUs/>},
    {path: "contact-us", element: <ContactUs/>},
    { path: "*", element: <div>Page Not Found</div> }
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
