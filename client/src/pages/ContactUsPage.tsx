import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { addMessage } from '../api/api-managingMessages';

const ContactUs = () => {
  const [formMode, setFormMode] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    recommendation: ''
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const toggleFormMode = () => {
    setFormMode(prevMode => prevMode === 'contact' ? 'recommend' : 'contact');
    setErrors({});
    setSubmissionStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'שם הוא שדה חובה';
    if (formMode === 'contact') {
      if (!formData.email.trim()) newErrors.email = 'אימייל הוא שדה חובה';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'כתובת אימייל לא תקינה';
      if (!formData.message.trim()) newErrors.message = 'הודעה היא שדה חובה';
    } else {
      if (!formData.recommendation.trim()) newErrors.recommendation = 'המלצה היא שדה חובה';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addMessage(formData);
      console.log('נתוני הטופס:', formData);
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', message: '', recommendation: '' });
    } else {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="contact-us-page">
      <Container fluid style={{ paddingTop: '100px' }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className='form-container'>
              <div className='form-header'>
                <h2>{formMode === 'contact' ? 'צור קשר' : 'המליצו עלינו'}</h2>
                {/* <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formMode === 'recommend'} 
                    onChange={toggleFormMode} 
                  />
                  <span className="slider">
                    <span className="slider-text">צור קשר</span>
                    <span className="slider-text">המליצו עלינו</span>
                  </span>
                </label> */}
              </div>
              
              {submissionStatus === 'success' && (
                <Alert variant="success">הטופס נשלח בהצלחה!</Alert>
              )}
              
              {submissionStatus === 'error' && (
                <Alert variant="danger">אנא תקן את השגיאות ונסה שוב.</Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formName'>
                  <Form.Control 
                    type='text' 
                    placeholder='הזן את השם המלא שלך'
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {formMode === 'contact' && (
                  <>
                    <Form.Group controlId="formEmail" className="mt-3">
                      <Form.Control 
                        type="email" 
                        placeholder="הזן את כתובת האימייל שלך"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formMessage" className="mt-3">
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="הזן את ההודעה שלך"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        isInvalid={!!errors.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {formMode === 'recommend' && (
                  <Form.Group controlId="formRecommendation" className="mt-3">
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="הזן את ההמלצה שלך"
                      name="recommendation"
                      value={formData.recommendation}
                      onChange={handleInputChange}
                      isInvalid={!!errors.recommendation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.recommendation}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <div className="button-container">
                  <Button variant="primary" type="submit">
                    {formMode === 'contact' ? 'שלח' : 'שלח המלצה'}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;