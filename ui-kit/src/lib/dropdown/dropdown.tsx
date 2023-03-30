import styles from './dropdown.module.scss';
import React, { HTMLProps, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { useClickOutside } from '@fancy-web-app/react-ui-utils';

interface Option {
  key: string;
  label: React.ReactNode;
}

export interface DropdownProps
  extends Omit<HTMLProps<HTMLElement>, 'onSelect' | 'onInput'> {
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
  onClickOutside: () => void;
  inputProps: HTMLProps<HTMLInputElement>;
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
  onClickOutside,
  inputProps,
}: DropdownProps) {
  const containerRef = useRef(null);
  const optionsContainerRef = useRef(null);

  useClickOutside({
    refs: [containerRef, optionsContainerRef],
    onClickOutside,
  });

  return (
    <div
      className={classNames(styles['container'], className)}
      ref={containerRef}
    >
      <div
        className={classNames(
          styles['operands-container'],
          isDropdownOpened && styles['operands-container-opened']
        )}
        onClick={onClick}
      >
        <input type="text" className={styles['input']} {...inputProps} />
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
            {!options.length && (
              <div
                className={classNames(
                  styles['option'],
                  styles['empty-option-placeholder']
                )}
              >
                No items found
              </div>
            )}
          </div>,
          dropdownOverlay
        )}
    </div>
  );
}

export default Dropdown;
