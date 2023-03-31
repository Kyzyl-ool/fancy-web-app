import EventEmitter from 'events';
import { DataSourceController, Option } from './data-source-controller';

interface Params<T extends Option> {
  dataSourceController: DataSourceController<T>;
}

export class KeyboardController<T extends Option> extends EventEmitter {
  protected dataSourceController: DataSourceController<T>;
  protected hoveredOptionIndex = 0;

  constructor({ dataSourceController }: Params<T>) {
    super();
    this.dataSourceController = dataSourceController;
  }

  get hoveredOptionKey(): string {
    return (
      this.dataSourceController.options[this.hoveredOptionIndex]?.key || ''
    );
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
    this.dataSourceController.onSelectOption(this.hoveredOptionKey);
    this.emit('update');
  };
  onBackspacePressed = () => {
    this.onArrowDown();
    this.dataSourceController.onRemoveLastOption();
  };
}
