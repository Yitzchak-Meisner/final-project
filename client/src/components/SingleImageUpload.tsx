import { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import styles from '../styles/UploadStyles.module.css';
import { links } from '../data';
import ImageUploader from './try3';

interface SingleImageUploadProps {
    defaultCategory?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({ defaultCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setMessage('נא להעלות תמונה');
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:3000/api/pictures/upload', {
                image,
                category: selectedCategory
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('התמונה הועלתה בהצלחה!');
            setImage(null);
        } catch (error) {
            setMessage('שגיאה בהעלאת התמונה');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.uploadForm}>
            <Form.Group className="mb-3">
                <Form.Label>קטגוריה</Form.Label>
                <Form.Select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                    disabled={loading}
                >
                    <option value="">בחר קטגוריה</option>
                    {Object.entries(links).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <ImageUploader 
                onImageUpload={(file) => console.log('תמונה הועלתה:', file)} 
                multiple={false} 
            />

            <button type="submit" className="btn btn-primary mt-3" disabled={loading || !image}>
                {loading ? 'מעלה...' : 'העלה תמונה'}
            </button>

            {message && (
                <div className={`${styles.alert} ${message.includes('שגיאה') ? 'alert-danger' : 'alert-success'} mt-3`}>
                    {message}
                </div>
            )}
        </form>
    );
};

export default SingleImageUpload;
