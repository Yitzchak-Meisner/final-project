import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrName || !password) {
      setErrorMessage('אנא מלא את כל השדות');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        emailOrName,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('התחברת בהצלחה!');
        setErrorMessage('');
        
        if (response.data.user.role === "manager") {
          localStorage.setItem('isAdmin', 'true');
        }
        localStorage.setItem('token', response.data.token);
        
        window.dispatchEvent(new Event('authStateChange'));
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('שם המשתמש או הסיסמה שגויים');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: '100vh' , paddingTop: '100px' }}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} lg={5}>
          <Card 
            className="shadow-lg" 
            style={{
              borderRadius: '15px',
              border: 'none',
              backgroundColor: '#fff'
            }}
          >
            <Card.Body className="p-5">
              <h2 
                className="text-center mb-4"
                style={{
                  color: '#366D73',
                  fontWeight: 'bold'
                }}
              >
                התחברות
              </h2>
              
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="emailOrName">
                  <Form.Control
                    type="text"
                    placeholder="שם משתמש או אימייל"
                    value={emailOrName}
                    onChange={(e) => setEmailOrName(e.target.value)}
                    style={{
                      backgroundColor: '#f8f9fa',
                      border: '2px solid #eee',
                      padding: '12px',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: '#f8f9fa',
                      border: '2px solid #eee',
                      padding: '12px',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>

                {errorMessage && (
                  <Alert 
                    variant="danger" 
                    className="mb-4"
                    style={{
                      backgroundColor: '#BF877A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    {errorMessage}
                  </Alert>
                )}
                
                {successMessage && (
                  <Alert 
                    variant="success" 
                    className="mb-4"
                    style={{
                      backgroundColor: '#366D73',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    {successMessage}
                  </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  style={{
                    backgroundColor: '#366D73',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#D9AA71';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#366D73';
                  }}
                >
                  התחבר
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;