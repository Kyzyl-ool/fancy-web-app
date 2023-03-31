import { Dropdown } from '@fancy-web-app/ui-kit';
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MemoizedDataSourceController, Option } from './data-source-controller';
import { KeyboardController } from '@fancy-web-app/smart-suggests';

const dataSourceController = new MemoizedDataSourceController('/api/langs');
const keyboardSuggestsController = new KeyboardController({
  dataSourceController,
});

export function DropdownController() {
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
  const onClickOutside = useCallback(() => {
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
    setHoveredOptionIndex(keyboardSuggestsController.getHoveredOptionIndex());
  }, []);
  useEffect(() => {
    dataSourceController.on('update', onUpdate);
    keyboardSuggestsController.on('update', onUpdate);

    return () => {
      dataSourceController.off('update', onUpdate);
      keyboardSuggestsController.off('update', onUpdate);
    };
  }, [onUpdate]);
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpened((prevState) => !prevState);
  }, []);

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
      }}
      onClickOutside={onClickOutside}
      onBackspacePressed={keyboardSuggestsController.onBackspacePressed}
      onArrowUp={keyboardSuggestsController.onArrowUp}
      onArrowDown={keyboardSuggestsController.onArrowDown}
      onEnterPressed={keyboardSuggestsController.onEnterPressed}
      onOptionHover={keyboardSuggestsController.setHoveredOptionIndex}
      optionsContainerRef={optionsContainerRef}
      inputRef={inputRef}
      onAngleButtonClick={toggleDropdown}
    />
  );
}

export default DropdownController;
