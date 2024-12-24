// PlusButton.tsx
import { Plus, Image, FileText } from 'lucide-react';
import { useState } from 'react';
import Popup from './Popup';
import SingleImageUpload from './SingleImageUpload';
import PostUpload from './PostUpload';
import stylesButtons from '../styles/StylesButtons.module.css';

interface PlusButtonProps {
  currentCategory?: string;
}

const PlusButton = ({ currentCategory }: PlusButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'image' | 'post' | null>(null);

  const handleButtonClick = (type: 'image' | 'post') => {
    setUploadType(type);
    setIsPopupOpen(true);
    setIsMenuOpen(false);
  };

  const getPopupContent = () => {
    switch (uploadType) {
      case 'image':
        return <SingleImageUpload defaultCategory={currentCategory} />;
      case 'post':
        return <PostUpload defaultCategory={currentCategory} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={stylesButtons.plusButtonContainer}>
        <div 
          className={stylesButtons.addNewButton}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Plus size={24} />
          {isMenuOpen && (
            <div className={stylesButtons.floatingMenu}>
              <button 
                className={stylesButtons.menuItem}
                onClick={() => handleButtonClick('post')}
              >
                <FileText size={18} />
                <span>הוסף פוסט</span>
              </button>
              <button 
                className={stylesButtons.menuItem}
                onClick={() => handleButtonClick('image')}
              >
                <Image size={18} />
                <span>הוסף תמונה</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <Popup 
          togglePopup={() => setIsPopupOpen(false)}
          title={uploadType === 'post' ? 'הוספת פוסט חדש' : 'העלאת תמונה חדשה'}
          content={getPopupContent()}
        />
      )}
    </>
  );
};

export default PlusButton;