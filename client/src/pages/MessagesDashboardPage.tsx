import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchMessages, addMessage, updateMessageStatus, deleteMessage } from '../api/api-managingMessages';
import { Table, Button, Form } from 'react-bootstrap';


const MessagesDashboard: React.FC = () => {

    const loadedMessages = useLoaderData() as { success: boolean; data: any[] };
    const [messages, setMessages] = useState(loadedMessages.data || []);


    //   const [newMessage, setNewMessage] = useState({ name: '', email: '', message: '' });

    // הוספת הודעה חדשה
    //   const handleAddMessage = async () => {
//     try {
    //       const addedMessage = await addMessage(newMessage);
    //       setMessages([...messages, addedMessage]);
//       setNewMessage({ name: '', email: '', message: '' });
//     } catch (error) {
//       console.error('Error adding message:', error);
//     }
//   };

// עדכון סטטוס הודעה
const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const updatedMessage = await updateMessageStatus(id, status);
      setMessages(messages.map((msg) => (msg.id === id ? updatedMessage : msg)));
    } catch (error) {
        console.error('Error updating message status:', error);
    }
};

// מחיקת הודעה
const handleDeleteMessage = async (id: number) => {
    try {
        await deleteMessage(id);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
      <div className="container mt-4">
      <h2>ניהול הודעות</h2>

      {/* טבלה להצגת הודעות */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>שם</th>
            <th>דוא"ל</th>
            <th>תוכן</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
              <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{msg.status}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdateStatus(msg.id, 'נענתה')}
                >
                  סמן כ"נענתה"
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(msg.id)}>
                  מחק
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* טופס להוספת הודעה */}
      {/* <h3>הוספת הודעה חדשה</h3>
      <Form>
      <Form.Group className="mb-3">
      <Form.Label>שם</Form.Label>
          <Form.Control
          type="text"
            value={newMessage.name}
            onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
            />
            </Form.Group>
            <Form.Group className="mb-3">
          <Form.Label>דוא"ל</Form.Label>
          <Form.Control
          type="email"
          value={newMessage.email}
            onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>תוכן</Form.Label>
          <Form.Control
          as="textarea"
          rows={3}
          value={newMessage.message}
          onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
          />
          </Form.Group>
          <Button variant="primary" onClick={handleAddMessage}>
          שלח הודעה
          </Button>
          </Form> */}
    </div>
  );
};

export default MessagesDashboard;

// טוען נתונים באמצעות ה-loader
export async function loader() {
  return await fetchMessages();
}