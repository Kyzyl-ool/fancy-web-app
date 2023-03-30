import { Dropdown } from '@fancy-web-app/ui-kit';
import { FormEventHandler, useCallback, useState } from 'react';
import { MemoizedDataSourceController } from './data-source-controller';

const dataSourceController = new MemoizedDataSourceController();

/* eslint-disable-next-line */
export interface DropdownControllerProps {}
export function DropdownController(props: DropdownControllerProps) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

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

  return (
    <Dropdown
      options={options}
      isDropdownOpened={isDropdownOpened}
      hoveredOperandKey={''}
      hoveredOptionKey={''}
      onClick={onClick}
      onSelect={dataSourceController.onSelectOption}
      onDeselect={dataSourceController.onRemoveSelectedOption}
      inputProps={{
        onInput,
        value: dataSourceController.searchString,
        placeholder: options.length ? 'Type to search...' : 'No items found',
        disabled: !options.length,
      }}
      onClickOutside={onClickOutside}
    />
  );
}

export default DropdownController;
