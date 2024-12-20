import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { navLinks } from '../data/index';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import '../styles/Navbar.css';

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');    
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackgroundColor);

    return () => window.removeEventListener('scroll', changeBackgroundColor);
  }, []);

  return (
    <div>
      <Navbar // הקונטיינר הראשי לניווט
        expand='xl'
        className={`navbar-custom ${changeColor ? 'color-active' : ''}`}
      >
        <Container fluid className="flex-row-reverse">
        {isLoggedIn ? (
            <Button variant="outline-danger" className="login-button" onClick={handleLogout}>
              <LogOut size={10} />
              <span>Log out</span>
            </Button>
          ) : (
            <Button variant="outline-primary" className="login-button" as={NavLink as any} to="/login">
              <User size={10} />
              <span>Log in</span>
            </Button>
          )}
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>{/*  כפתור לפתיחה/סגירה של התפריט במסכים קטנים */}
          <Navbar.Brand href='/' className='order-xl-1'> {/* מציג את לוגו/שם המותג */}
            <img src='/logo.png' alt='ציפי שטיין - עיצובי ברים' />
          </Navbar.Brand>
          <Navbar.Collapse id='basic-navbar-nav'> {/* אזור שנפתח/נסגר על ידי ה-Toggle, מחזיק את הניווט */}
            <Nav className='mx-auto'> {/* מכולה לפריטי נווט (Nav Items) */}
              {navLinks.map((Link) => {
                return (
                  <Nav.Link // קישורים פנימיים בתפריט הניווט
                    as={NavLink}
                    to={Link.path}
                    key={Link.id}
                    className='nav-link custom-link'
                  >
                    {Link.text}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
