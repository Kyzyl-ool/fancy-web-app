import styles from './dropdown.module.scss';

/* eslint-disable-next-line */
export interface DropdownProps {
  isNative?: boolean;
}

export function Dropdown({isNative}: DropdownProps) {
  if (isNative) {

  return (
    <select className={styles['container']}>
      <option>Hello</option>
    </select>
  );
  }

  return <div>

  </div>
}

export default Dropdown;
