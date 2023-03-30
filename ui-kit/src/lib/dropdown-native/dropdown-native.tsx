import styles from './dropdown-native.module.scss';

/* eslint-disable-next-line */
export interface DropdownNativeProps {}

export function DropdownNative(props: DropdownNativeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DropdownNative!</h1>
    </div>
  );
}

export default DropdownNative;
