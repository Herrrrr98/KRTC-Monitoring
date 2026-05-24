import { useNavigate } from 'react-router-dom';
import styles from './navTPBtn.module.css'
import '../theme.css';

export function NavTPBtn({name, path}) {
  const navigate = useNavigate();
  return(
    <button className={styles.navTPBtn} onClick={() => navigate(path)}>{name}</button>
  )
}