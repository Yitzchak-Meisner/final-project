import { Plus } from 'lucide-react';
import stylesButtons from '../styles/stylesButtons.module.css';

const PlusButton = () => {
  return (
      <div className={stylesButtons.addNewButton} onClick={() => {}}>
        <Plus size={24} />
      </div>
  )
}

export default PlusButton;
