import axios from "axios";

export interface Post {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export const fetchPostsByCategory = async (category: string): Promise<Post[]> => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        params: { category }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
};

export const deletePost = async (id: string, keepImages: boolean) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:3000/api/posts/${id}`, {
      params: { keepImages },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const fetchLatestPosts = async (page: number = 1, limit: number = 5) => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts/latest', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
};