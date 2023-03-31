import EventEmitter from 'events';
import { DataSourceController, Option } from './data-source-controller';

interface Params<T extends Option> {
  dataSourceController: DataSourceController<T>;
}

export class KeyboardController<
  T extends Option = Option
> extends EventEmitter {
  protected dataSourceController: DataSourceController<T>;
  protected hoveredOptionIndex = 0;

  constructor({ dataSourceController }: Params<T>) {
    super();
    this.dataSourceController = dataSourceController;
  }

  onArrowUp = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex - 1 + this.dataSourceController.options.length) %
      this.dataSourceController.options.length;
    this.emit('update');
  };
  onArrowDown = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex + 1) % this.dataSourceController.options.length;
    this.emit('update');
  };
  onEnterPressed = () => {
    const { options } = this.dataSourceController;
    const option = options[this.hoveredOptionIndex];
    if (this.hoveredOptionIndex === options.length - 1) {
      this.hoveredOptionIndex--;
    }
    this.dataSourceController.onSelectOption(option.key);
    this.dataSourceController.setSearchString('');
    this.emit('update');
  };
  onEscPressed = () => {
    this.hoveredOptionIndex = 0;
    this.emit('update');
  };
  onBackspacePressed = () => {
    if (!this.dataSourceController.searchString) {
      this.onArrowDown();
      this.dataSourceController.onRemoveLastOption();
    }
  };

  getHoveredOptionIndex = () => {
    return this.hoveredOptionIndex;
  };
  setHoveredOptionIndex = (newIndex: number) => {
    this.hoveredOptionIndex = newIndex;
    this.emit('update');
  };
}
