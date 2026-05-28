import styles from './RightContainer.module.css';
import '../theme.css';
import { NavTPBtn } from './NavTPBtn';

export function RightContainer() {
  return (
    <div className={styles.rightNavBox}>
      <NavTPBtn name="前往範例頁面..." path="/TripTimeOverview"></NavTPBtn>
      <NavTPBtn name="前往頁面..." path="/path"></NavTPBtn>
      <NavTPBtn name="前往頁面..." path="/path"></NavTPBtn>
    </div>
  )
}