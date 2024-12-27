import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [emailOrName, setEmailOrName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const navigate = useNavigate();

  // פונקציית טיפול באירוע התחברות
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // בדיקה בסיסית לאימות
    if (!emailOrName || !password) {
      setErrorMessage('אנא מלא את כל השדות.');
      setSuccessMessage('');
      return;
    }

    try {
      // שליחת נתוני ההתחברות לשרת
      const response = await axios.post('http://localhost:3000/api/users/login', {
        emailOrName,
        password,
      });

      // טיפול בתגובה מהשרת
      if (response.status === 200) {
        setSuccessMessage('התחברת בהצלחה!');
        setErrorMessage('');
        // console.log(response.data.user);
        
        // שמירת נתוני המשתמש
        if (response.data.user.role === "manager") {
          localStorage.setItem('isAdmin', 'true');
          
        }
        localStorage.setItem('token', response.data.token);
        
        // הודעה על שינוי מצב ההתחברות
        window.dispatchEvent(new Event('authStateChange'));
        
        navigate('/');
      }
    } catch (error) {
      // טיפול בשגיאות
      setErrorMessage('שגיאה: שם המשתמש או הסיסמה שגויים.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">התחברות</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="emailOrName" className="mb-3">
              <Form.Label>שם משתמש או אימייל</Form.Label>
              <Form.Control
                type="text"
                placeholder="הזן שם או אימייל"
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>סיסמה</Form.Label>
              <Form.Control
                type="password"
                placeholder="הזן סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-success mb-3">{successMessage}</div>
            )}

            <Button variant="primary" type="submit" className="w-100">
              התחבר
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
