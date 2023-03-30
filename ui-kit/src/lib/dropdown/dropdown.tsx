import styles from './dropdown.module.scss';
import React, { HTMLProps } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

interface Option {
  key: string;
  label: React.ReactNode;
}

export interface DropdownProps
  extends Omit<HTMLProps<HTMLElement>, 'onSelect'> {
  /**
   * Opens dropdown
   */
  isDropdownOpened: boolean;
  /**
   * Options to select
   */
  options: Option[];
  /**
   * When option was clicked or selected from keyboard
   * @param option
   */
  onSelect: (option: Option) => void;
  /**
   * When dropdown itself was clicked
   */
  onClick: () => void;
  /**
   * When removing selected option clicking by cross or pressing Backspace from keyboard
   * @param option
   */
  onDeselect: (option: Option) => void;
  /**
   * Selected option to be hovered
   */
  hoveredOperandKey: string;
  /**
   * Dropdown option to be hovered
   */
  hoveredOptionKey: string;
}

export function Dropdown({
  className,
  isDropdownOpened,
  hoveredOptionKey,
  hoveredOperandKey,
  options,
  onClick,
  onDeselect,
  onSelect,
}: DropdownProps) {
  const mergedClassnames = classNames(styles['container'], className);

  return (
    <div className={mergedClassnames}>
      <input type="text" />
      {ReactDOM.createPortal(
        <div>
          {options.map(({ key, label }) => (
            <div key={key} className={styles['option']}>
              {label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

export default Dropdown;
