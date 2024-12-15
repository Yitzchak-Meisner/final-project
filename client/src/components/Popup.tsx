import { ReactNode, useEffect } from "react";
import styles from '../styles/popup.module.css';
interface PopupProps {
    togglePopup: () => void;
    title: string;
    children: ReactNode;
}

const Popup = ({ togglePopup, title, children } : PopupProps) => {

  useEffect(() => {
    // מוסיף את הקלאס כשהקומפוננטה נטענת
    document.body.classList.add('popup-open');
    
    // מסיר את הקלאס כשהקומפוננטה מתפרקת
    return () => {
        document.body.classList.remove('popup-open');
    };
}, []);

  return (
    <div className={styles.popupOverlay} onClick={togglePopup}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className={styles.popupBody}>
          {children}
        </div>
        <button className={styles.closeButton} onClick={togglePopup}>close</button>
      </div>
    </div>
  );
};

export default Popup;