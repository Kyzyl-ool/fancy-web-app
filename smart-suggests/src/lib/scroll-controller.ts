import { DataSourceController, Option } from './data-source-controller';
import { KeyboardController } from './keyboard-controller';
import EventEmitter from 'events';

interface Params<T extends Option> {
  dataSourceController: DataSourceController<T>;
  keyboardController: KeyboardController<T>;
  /**
   * One option height (px)
   */
  optionHeight: number;
}

export class ScrollController<T extends Option> extends EventEmitter {
  protected dataSourceController: DataSourceController<T>;
  protected keyboardController: KeyboardController<T>;
  protected optionHeight: number;

  constructor({
    dataSourceController,
    keyboardController,
    optionHeight,
  }: Params<T>) {
    super();
    this.dataSourceController = dataSourceController;
    this.keyboardController = keyboardController;
    this.optionHeight = optionHeight;

    this.keyboardController.on('update', () => {
      const hoveredOptionIndex =
        this.keyboardController.getHoveredOptionIndex();
    });
  }

  public onScroll = ({ currentTarget }: Event) => {
    console.log(currentTarget);
  };
}
