import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ImageUpload from "../components/ImageUpload";
import PlusButton from "../components/PlusButton";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  

  if (loading) {
    return <p className="text-center">טוען פוסטים...</p>;
  }

  if (posts.length === 0) {
    return (
    <>
      <p className="text-center">אין פוסטים להצגה כרגע.</p>
      <PlusButton 
          popupTitle="הוספת פוסט"
          popupContent={<ImageUpload />}
      />
    </>);
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          {posts.map((post) => (
            <Col key={post.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                {post.images.length > 0 && (
                  <Card.Img
                    variant="top"
                    src={post.images[0]} // מציגים את התמונה הראשונה
                    alt={post.title}
                  />
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.description}
                    <br />
                    <strong>קטגוריה:</strong> {post.category}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <PlusButton 
          popupTitle="העלאת תמונה"
          popupContent={<ImageUpload />}
      />
    </>
  );
};

export default Posts;
