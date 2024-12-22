import axios from 'axios';

const API_URL = 'http://localhost:3000/api/messages';

// קבלת כל ההודעות
export const fetchMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// הוספת הודעה חדשה
export const addMessage = async (message: { name: string; email: string; message: string }) => {
  try {
    const response = await axios.post(API_URL, message);
    return response.data;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// עדכון סטטוס הודעה
export const updateMessageStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

// מחיקת הודעה
export const deleteMessage = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};
