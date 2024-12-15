import { Plus } from 'lucide-react';
import { useState } from 'react';
import Popup from './Popup';
import stylesButtons from '../styles/StylesButtons.module.css';
import { ReactNode } from 'react';

interface PlusButtonProps {
  popupTitle: string;
  popupContent: ReactNode; 
}

const PlusButton = ({ popupTitle, popupContent }: PlusButtonProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <div className={stylesButtons.addNewButton} onClick={togglePopup}>
        <Plus size={24} />
      </div>
      {isPopupOpen && (
        <Popup togglePopup={togglePopup} title={popupTitle} content={popupContent} />
      )}
    </>
  );
};

export default PlusButton;
