import styles from './dropdown.module.scss';
import React, { HTMLProps, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { useClickOutside } from '@fancy-web-app/react-ui-utils';
import { ReactComponent as CrossIcon } from '../../icons/cross.svg';

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
   * Selected options
   */
  selectedOptions: Option[];
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
   * Dropdown option to be hovered
   */
  hoveredOptionIndex: number;
  dropdownOverlay?: HTMLElement;
  onClickOutside: () => void;
  inputProps: Omit<HTMLProps<HTMLInputElement>, 'ref'>;
  onBackspacePressed: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
  onEnterPressed: () => void;
  onOptionHover: (optionIndex: number) => void;
  optionsContainerRef: React.RefObject<HTMLDivElement>;
}

export function Dropdown({
  className,
  isDropdownOpened,
  hoveredOptionIndex,
  options,
  onClick,
  onDeselect,
  onSelect,
  dropdownOverlay = document.body,
  onClickOutside,
  inputProps,
  selectedOptions,
  onBackspacePressed,
  onArrowUp,
  onArrowDown,
  onEnterPressed,
  onOptionHover,
  optionsContainerRef,
}: DropdownProps) {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside({
    refs: [containerRef, optionsContainerRef],
    onClickOutside,
  });

  const keyboardHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (inputRef?.current === document.activeElement) {
        if (optionsContainerRef?.current) {
          const option =
            optionsContainerRef.current.querySelector('* > *:first-child');
          const optionHeight = option!.getBoundingClientRect().height;

          const dropdownHeight =
            optionsContainerRef.current.getBoundingClientRect().height;

          if (
            optionsContainerRef.current.scrollTop / optionHeight + 3 >
            hoveredOptionIndex
          ) {
            optionsContainerRef.current.scrollTop =
              (hoveredOptionIndex - 3) * optionHeight;
          } else if (
            optionsContainerRef.current.scrollTop / optionHeight +
              dropdownHeight / optionHeight -
              4 <
            hoveredOptionIndex
          ) {
            optionsContainerRef.current.scrollTop =
              (hoveredOptionIndex - dropdownHeight / optionHeight + 4) *
              optionHeight;
          }
        }
        switch (key) {
          case 'Backspace': {
            onBackspacePressed();
            break;
          }
          case 'ArrowUp': {
            onArrowUp();
            break;
          }
          case 'ArrowDown': {
            onArrowDown();
            break;
          }
          case 'Enter': {
            onEnterPressed();
            break;
          }
        }
      }
    },
    [
      hoveredOptionIndex,
      onArrowDown,
      onArrowUp,
      onBackspacePressed,
      onEnterPressed,
      optionsContainerRef,
    ]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler);

    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, [keyboardHandler]);

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
        {selectedOptions.map(({ key, label }) => (
          <div key={key} className={styles['operand']}>
            {label}
            <div
              className={styles['operand-close-button']}
              onClick={() => onDeselect(key)}
            >
              <CrossIcon />
            </div>
          </div>
        ))}
        <input
          type="text"
          className={styles['input']}
          ref={inputRef}
          {...inputProps}
        />
      </div>
      {isDropdownOpened &&
        ReactDOM.createPortal(
          <div
            className={styles['options-container']}
            ref={optionsContainerRef}
          >
            {options.map(({ key, label }, index) => (
              <div
                key={key}
                className={classNames(
                  styles['option'],
                  hoveredOptionIndex === index && styles['option-hovered']
                )}
                onClick={() => onSelect(key)}
                onMouseEnter={() => onOptionHover(index)}
              >
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
                Empty
              </div>
            )}
          </div>,
          dropdownOverlay
        )}
    </div>
  );
}

export default Dropdown;
