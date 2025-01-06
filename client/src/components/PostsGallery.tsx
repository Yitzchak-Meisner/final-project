import { useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import PostPopup from './PostPopup';
import DeletePostConfirmation from './DeletePostConfirmation';
import { deletePost } from '../api/FetchingPosts';

interface Post {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const PostsGallery: React.FC<{ posts: Post[], onPostDeleted?: () => void }> = ({ posts, onPostDeleted }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPost(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    setPostToDelete(post);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async (keepImages: boolean) => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete.id, keepImages);
        setShowDeleteConfirmation(false);
        setPostToDelete(null);
        if (onPostDeleted) {
          onPostDeleted();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post.id}>
            <Card 
              className="h-100" 
              style={{ 
                cursor: 'pointer', 
                borderRadius: '8px',
                overflow: 'hidden',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                backgroundColor: '#ffffff'
              }} 
              onClick={() => handlePostClick(post)}
            >
              <div style={{ position: 'relative', paddingTop: '100%', backgroundColor: '#f8f9fa' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px'
                }}>
                  {/* כאן אפשר להוסיף אייקון תמונה כברירת מחדל */}
                </div>
                {post.images[0] && (
                  <Card.Img
                    variant="top"
                    src={post.images[0]}
                    alt={post.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                )}
                {isAdmin && (
                  <div 
                    onClick={(e) => handleDeleteClick(e, post)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      padding: '8px',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  >
                    <Trash2 size={20} color="#dc3545" />
                  </div>
                )}
              </div>
              <Card.Body style={{ padding: '1rem' }}>
                <Card.Title style={{ 
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  {post.title}
                </Card.Title>
                <Card.Text style={{ 
                  color: '#666',
                  fontSize: '0.9rem',
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPost && (
        <PostPopup
          post={selectedPost}
          show={showPopup}
          onClose={handleClosePopup}
        />
      )}

      <DeletePostConfirmation
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default PostsGallery;