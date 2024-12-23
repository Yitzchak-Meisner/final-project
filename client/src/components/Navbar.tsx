import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { navLinks } from '../data/index';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import '../styles/Navbar.css';

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

   // בדוק את סטטוס ההתחברות בעת הטעינה ומתי משתנה ה localStorage
   useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const adminStatus = localStorage.getItem('isAdmin');
      setIsLoggedIn(!!token);
      setIsAdmin(adminStatus === 'true');
    };

    // בדוק את סטטוס ההתחברות בעת הטעינה
    checkLoginStatus();

    // האזן לשינוי סטטוס ההתחברות (שינויים בטאבים אחרים)
    window.addEventListener('storage', checkLoginStatus);
    
    // מאזין אירועים מותאם אישית לכניסה/יציאה (שינויים בטאב הנוכחי)
    window.addEventListener('authStateChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authStateChange', checkLoginStatus);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);

    window.dispatchEvent(new Event('authStateChange'));

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
                // אם זה קישור 'צור קשר'
                if (Link.path === 'contact-us') {
                  // אם המשתמש הוא מנהל, מציג 'הודעות'
                  if (isAdmin) {
                    return (
                      <Nav.Link
                        as={NavLink}
                        to="/messages"
                        key="messages"
                        className='nav-link custom-link'
                      >
                        הודעות
                      </Nav.Link>
                    );
                  }
                  // אם המשתמש אינו מנהל, מציג 'צור קשר'
                  return (
                    <Nav.Link
                      as={NavLink}
                      to={Link.path}
                      key={Link.id}
                      className='nav-link custom-link'
                    >
                      {Link.text}
                    </Nav.Link>
                  );
                }
                // כל שאר הקישורים מוצגים תמיד
                return (
                  <Nav.Link
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
