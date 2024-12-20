import axios from 'axios';


export async function deleteImage(id) {
    try {
        const response = await axios.delete(`http://localhost:3000/api/pictures/delete/${id}`, {
          params: {
            id
          }
        });

        return response.data;
    } catch (error) {
        throw new Error('Error deleting image: ' + error.message);
    }
}
