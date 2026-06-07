import styles from './RightContainer.module.css';
import '../theme.css';
import { NavTPBtn } from './NavTPBtn';

export function RightContainer() {
  return (
    <div className={styles.rightNavBox}>
      <NavTPBtn name="Switch Machine Detctor" path="/SwitchMachineDetectorOverview"></NavTPBtn>
      <NavTPBtn name="ReplayDashboard" path="/ReplayDashboard"></NavTPBtn>
    </div>
  )
}