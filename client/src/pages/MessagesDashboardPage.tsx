import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchMessages, updateMessageStatus, deleteMessage } from '../api/api-managingMessages';
import { Table, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import '../styles/MessagesDashboard.css';


const MessagesDashboard: React.FC = () => {

    const loadedMessages = useLoaderData() as { success: boolean; data: any[] };
    const [messages, setMessages] = useState(loadedMessages.data || []);
    const [statusFilter, setStatusFilter] = useState<string | null> (null);

    const statusOptions = ['נענתה', 'נקראה', 'חדש'];

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

  // Status badge color
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'חדש':
        return 'primary';
      case 'נקראה':
        return 'info';
      case 'נענתה':
        return 'success';
      default:
        return 'secondary';
    }
  };

  // Filter messages by status
  const filteredMessages = statusFilter
    ? messages.filter((msg) => msg.status === statusFilter)
    : messages;

    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>ניהול הודעות</h2>
          
          <div className="filter-section">
            <ButtonGroup>
              <Button
                variant={statusFilter === null ? 'dark' : 'outline-dark'}
                onClick={() => setStatusFilter(null)}
              >
                הכל ({messages.length})
              </Button>
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? getStatusVariant(status) : `outline-${getStatusVariant(status)}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status} ({messages.filter(msg => msg.status === status).length})
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
  
        <div className="table-responsive">
          <Table striped bordered hover className="message-table">
            <thead>
              <tr>
                <th>שם</th>
                <th>דוא"ל</th>
                <th className="message-content">תוכן</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => (
                <tr key={msg.id}>
                  <td className="align-middle">{msg.name}</td>
                  <td className="align-middle">{msg.email}</td>
                  <td className="message-content align-middle">{msg.message}</td>
                  <td className="align-middle">
                    <span className={`badge bg-${getStatusVariant(msg.status)}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex gap-2 flex-wrap">
                      <Dropdown>
                        <Dropdown.Toggle 
                          variant={getStatusVariant(msg.status)} 
                          size="sm"
                        >
                          שנה סטטוס
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {statusOptions.map((status) => (
                            <Dropdown.Item
                              key={status}
                              onClick={() => handleUpdateStatus(msg.id, status)}
                              active={msg.status === status}
                            >
                              {status}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        מחק
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };
  
  export default MessagesDashboard;
// טוען נתונים באמצעות ה-loader
export async function loader() {
  return await fetchMessages();
}