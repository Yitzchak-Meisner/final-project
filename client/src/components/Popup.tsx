import { ReactNode, useEffect } from "react";
import styles from '../styles/Popup.module.css';

interface PopupProps {
    togglePopup: () => void;
    title: string;
    content: ReactNode; // במקום children
}

const Popup = ({ togglePopup, title, content } : PopupProps) => {
  useEffect(() => {
    // מוסיף את הקלאס כשהקומפוננטה נטענת, למניעת גלילה
    document.body.classList.add('popup-open');
    return () => {
        document.body.classList.remove('popup-open');
    };
  }, []);

  return (
    <div className={styles.popupOverlay} onClick={togglePopup}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className={styles.popupBody}>
          {content}
        </div>
        <button className={styles.closeButton} onClick={togglePopup}>close</button>
      </div>
    </div>
  );
};

export default Popup;
