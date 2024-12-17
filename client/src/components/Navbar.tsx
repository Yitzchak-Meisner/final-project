import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { navLinks } from '../data/index';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);

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
        <Container fluid>
          <Navbar.Brand href='/'> {/* מציג את לוגו/שם המותג */}
            <img src='/logo.png' alt='ציפי שטיין - עיצובי ברים' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' /> {/* כפתור לפתיחה/סגירה של התפריט במסכים קטנים */}
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
