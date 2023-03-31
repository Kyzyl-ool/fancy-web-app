import { Dropdown } from '@fancy-web-app/ui-kit';
import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Option } from '../controllers/data-source-controller';
import { Controllers } from '../controllers/provider';

interface Props {
  controllers: Controllers;
}
export function DropdownController({
  controllers: { keyboardController, dataSourceController },
}: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState(0);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    if (options.length) {
      setIsDropdownOpened(true);
    }
    inputRef?.current?.focus();
  }, [options.length, inputRef]);
  const closeDropdown = useCallback(() => {
    setIsDropdownOpened(false);
  }, []);
  const onInput: FormEventHandler<HTMLInputElement> = useCallback(
    ({ currentTarget: { value } }) => {
      dataSourceController.setSearchString(value);
    },
    []
  );
  const onUpdate = useCallback(() => {
    setOptions(dataSourceController.options);
    setSelectedOptions(dataSourceController.selectedOptions);
    setHoveredOptionIndex(keyboardController.getHoveredOptionIndex());
  }, []);
  useEffect(() => {
    dataSourceController.on('update', onUpdate);
    keyboardController.on('update', onUpdate);

    return () => {
      dataSourceController.off('update', onUpdate);
      keyboardController.off('update', onUpdate);
    };
  }, [onUpdate]);
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpened((prevState) => !prevState);
  }, []);
  const onEscPressed = useCallback(() => {
    closeDropdown();
    keyboardController.onEscPressed();
  }, [closeDropdown]);

  return (
    <Dropdown
      options={options}
      selectedOptions={selectedOptions}
      isDropdownOpened={isDropdownOpened}
      hoveredOptionIndex={hoveredOptionIndex}
      onClick={onClick}
      onSelect={dataSourceController.onSelectOption}
      onDeselect={dataSourceController.onRemoveSelectedOption}
      inputProps={{
        onInput,
        value: dataSourceController.searchString,
        placeholder: options.length ? 'Type to search...' : 'No items found',
        onFocus: onClick,
        onBlur: closeDropdown,
      }}
      onClickOutside={closeDropdown}
      onBackspacePressed={keyboardController.onBackspacePressed}
      onArrowUp={keyboardController.onArrowUp}
      onArrowDown={keyboardController.onArrowDown}
      onEnterPressed={keyboardController.onEnterPressed}
      onOptionHover={keyboardController.setHoveredOptionIndex}
      optionsContainerRef={optionsContainerRef}
      inputRef={inputRef}
      onAngleButtonClick={toggleDropdown}
      onEscPressed={onEscPressed}
    />
  );
}

export default DropdownController;
