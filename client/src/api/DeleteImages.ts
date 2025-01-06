import axios from 'axios';


export async function deleteImage(id: string) {

    const token = localStorage.getItem('token');

    try {
        const response = await axios.delete(`http://localhost:3000/api/pictures/delete/${id}`, {
          params: {
            id
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.data;
    } catch (error) {
        throw new Error('Error deleting image: ' + (error as Error).message);
    }
}
