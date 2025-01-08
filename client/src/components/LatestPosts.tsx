import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Card } from 'react-bootstrap';
import PostPopup from './PostPopup';
import { fetchLatestPosts, Post } from '../api/FetchingPosts';
import { useLoaderData } from 'react-router-dom';
import styles from '../styles/LatestPosts.module.css';

const LatestPosts = () => {
  const initialPosts = useLoaderData<Post[]>(); // קבלת הפוסטים הראשונים
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [page, setPage] = useState(2); // התחל מעמוד 2, כי הראשון נטען מראש
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
    if (initialPosts && initialPosts.length > 0) return; // דלג אם הנתונים כבר קיימים
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
    <Container fluid className={`${styles.container} w-100 min-vh-100`}>
      <div className={styles.title}>
        <h1 className='text-center fw-bold'>האירועים האחרונים שלנו</h1>
        <p className='text-center'>
          באפשרותכם להתרשם מהביצועים הכי מרשימים שלנו
        </p>
      </div>
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

export const latestPostsLoader = async () => {
  try {
    const posts = await fetchLatestPosts(1); // הבאת עמוד אחד (5 פוסטים)
    return posts;
  } catch (error) {
    throw new Response('Failed to load posts', { status: 500 });
  }
};


export default LatestPosts;