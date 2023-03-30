import styles from './dropdown.module.scss';
import React, { HTMLProps, useCallback, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { useClickOutside } from '@fancy-web-app/react-ui-utils';

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
  onSelect: (optionKey: string) => void;
  /**
   * When dropdown itself was clicked
   */
  onClick: () => void;
  /**
   * When removing selected option clicking by cross or pressing Backspace from keyboard
   * @param option
   */
  onDeselect: (optionKey: string) => void;
  /**
   * Selected option to be hovered
   */
  hoveredOperandKey: string;
  /**
   * Dropdown option to be hovered
   */
  hoveredOptionKey: string;
  dropdownOverlay?: HTMLElement;
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
  dropdownOverlay = document.body,
}: DropdownProps) {
  const containerRef = useRef(null);
  const optionsContainerRef = useRef(null);

  const onClickOutside = useCallback(() => {
    console.log(123);
  }, []);

  useClickOutside({
    refs: [containerRef, optionsContainerRef],
    onClickOutside,
  });

  return (
    <div
      className={classNames(styles['container'], className)}
      ref={containerRef}
    >
      <div className={styles['operands-container']} onClick={onClick}>
        <input type="text" className={styles['input']} />
      </div>
      {isDropdownOpened &&
        ReactDOM.createPortal(
          <div
            className={styles['options-container']}
            ref={optionsContainerRef}
          >
            {options.map(({ key, label }) => (
              <div key={key} className={styles['option']}>
                {label}
              </div>
            ))}
          </div>,
          dropdownOverlay
        )}
    </div>
  );
}

export default Dropdown;
