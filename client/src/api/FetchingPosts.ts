import axios from "axios";

export const fetchPostsByCategory = async (category: string) => {
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