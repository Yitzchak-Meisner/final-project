import { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import PostsGallery from './PostsGallery';
import { fetchLatestPosts } from '../api/FetchingPosts';
import styles from '../styles/LatestPosts.module.css';

interface Post {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const LatestPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const POSTS_PER_PAGE = 5;

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const newPosts = await fetchLatestPosts(page);
      
      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
      
      setPosts(prevPosts => {
        // Remove duplicates based on post ID
        const uniquePosts = [...prevPosts, ...newPosts].filter(
          (post, index, self) => index === self.findIndex(p => p.id === post.id)
        );
        return uniquePosts;
      });
      
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Load more posts when the last post becomes visible
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts();
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: '100px', // Start loading before the element is visible
        threshold: 0.1
      }
    );

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => observer.disconnect();
  }, [loadPosts, hasMore, loading]);

  // Initial load
  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostDeleted = (deletedPostId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  };

  return (
    <Container fluid className={styles.container}>
      <h2 className={styles.title}>הפוסטים האחרונים שלנו</h2>
      
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
            >
              <div className={styles.postContent}>
                <PostsGallery 
                  posts={[post]}
                  onPostDeleted={() => handlePostDeleted(post.id)}
                />
              </div>
            </div>
          ))}
          
          {loading && (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}>טוען...</div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default LatestPosts;