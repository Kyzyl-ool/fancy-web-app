import { Dropdown } from '@fancy-web-app/ui-kit';
import {
  FormEventHandler,
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MemoizedDataSourceController, Option } from './data-source-controller';
import { KeyboardController } from '@fancy-web-app/smart-suggests';

const dataSourceController = new MemoizedDataSourceController();
const keyboardSuggestsController = new KeyboardController({
  dataSourceController,
});

/* eslint-disable-next-line */
export interface DropdownControllerProps {}
export function DropdownController(props: DropdownControllerProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [hoveredOptionKey, setHoveredOptionKey] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback(() => {
    if (options.length) {
      setIsDropdownOpened(true);
    }
  }, [options.length]);
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
    setHoveredOptionKey(keyboardSuggestsController.hoveredOptionKey);
  }, []);
  useEffect(() => {
    dataSourceController.on('update', onUpdate);
    keyboardSuggestsController.on('update', onUpdate);

    return () => {
      dataSourceController.off('update', onUpdate);
      keyboardSuggestsController.off('update', onUpdate);
    };
  }, [onUpdate]);
  useEffect(() => {
    optionsContainerRef &&
      keyboardSuggestsController.setDropdownOptionsContainerRef(
        optionsContainerRef
      );
  }, [optionsContainerRef]);
  const onScroll: UIEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget: { scrollTop } }) => {
      console.log(scrollTop);
    },
    []
  );

  return (
    <Dropdown
      options={options}
      selectedOptions={selectedOptions}
      isDropdownOpened={isDropdownOpened}
      hoveredOptionKey={hoveredOptionKey}
      onClick={onClick}
      onSelect={dataSourceController.onSelectOption}
      onDeselect={dataSourceController.onRemoveSelectedOption}
      inputProps={{
        onInput,
        value: dataSourceController.searchString,
        placeholder: options.length ? 'Type to search...' : 'No items found',
      }}
      inputRef={inputRef}
      optionsContainerRef={optionsContainerRef}
      onClickOutside={onClickOutside}
      onBackspacePressed={keyboardSuggestsController.onBackspacePressed}
      onArrowUp={keyboardSuggestsController.onArrowUp}
      onArrowDown={keyboardSuggestsController.onArrowDown}
      onEnterPressed={keyboardSuggestsController.onEnterPressed}
      onScroll={onScroll}
    />
  );
}

export default DropdownController;
