import { Container, Row, Col } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import { translateKeyValue } from '../data';

const CardsDisplay = ({ images, deleteImg }) => {

  const admin = localStorage.getItem('isAdmin');

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {images.map((img) => (
          <Col key={img.id} xs={12} sm={6} md={4} lg={4}>
            <div className="card h-100 shadow-sm position-relative">
              <div className="card-body">
                <img 
                  src={img.url} 
                  alt={translateKeyValue(img.category) || img.category}
                  className="img-fluid rounded" 
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover'
                  }}
                  />
                  {admin ? <Trash2 onClick = {() => deleteImg(img.id)}/> : null}
                {/* <h5 className="card-title mt-3">{translateKeyValue(img.category)}</h5> */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsDisplay;