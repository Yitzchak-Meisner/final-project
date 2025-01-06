import axios from 'axios';

export interface Image {
    id: string;
    image_url: string;
    category: string;
    created_date: string;
    rank: number;
}

export async function fetchImagesByCategory(category: string): Promise<Image[]> {
    try {
        const response = await axios.get<Image[]>('http://localhost:3000/api/pictures', {
          params: {
            category
          }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images: ' + error);
        return [];
    }
}
