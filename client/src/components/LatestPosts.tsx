import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import PostPopup from './PostPopup';
import { fetchLatestPosts, Post } from '../api/FetchingPosts';
import styles from '../styles/LatestPosts.module.css';

const LatestPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const POSTS_PER_PAGE = 5;

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore || isFetching.current) return;

    isFetching.current = true;
    try {
      setLoading(true);
      setError(null);
      
      const newPosts = await fetchLatestPosts(page);
      
      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
      
      setPosts(prevPosts => {
        const uniquePosts = [...prevPosts, ...newPosts].filter(
          (post, index, self) => index === self.findIndex(p => p.id === post.id)
        );
        return uniquePosts;
      });
    } catch (error) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => observer.disconnect();
  }, [loadPosts, hasMore, loading]);

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPost(null);
  };

  return (
    <Container fluid className={styles.container}>
      <h2 className={styles.title}>האירועים האחרונים שלנו</h2>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.horizontalScroll}>
        <div className={styles.scrollWrapper}>
          {posts.map((post, index) => (
            <div 
              key={post.id}
              className={styles.postCard}
              ref={index === posts.length - 1 ? lastPostRef : null}
              onClick={() => handlePostClick(post)}
            >
              <Card className={styles.card}>
                <div className={styles.imageContainer}>
                  {post.images[0] && (
                    <Card.Img
                      src={post.images[0]}
                      alt={post.title}
                      className={styles.cardImage}
                    />
                  )}
                </div>
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    {post.title}
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    {post.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
          
          {loading && (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}>טוען...</div>
            </div>
          )}
        </div>
      </div>

      {selectedPost && (
        <PostPopup
          post={selectedPost}
          show={showPopup}
          onClose={handleClosePopup}
        />
      )}
    </Container>
  );
};

export default LatestPosts;