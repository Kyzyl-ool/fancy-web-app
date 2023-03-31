import { DataSourceController, Option } from './data-source-controller';
import { KeyboardController } from './keyboard-controller';
import EventEmitter from 'events';

interface Params<T extends Option> {
  dataSourceController: DataSourceController<T>;
  keyboardController: KeyboardController<T>;
}

export class ScrollController<T extends Option> extends EventEmitter {
  protected dataSourceController: DataSourceController<T>;
  protected keyboardController: KeyboardController<T>;

  constructor({ dataSourceController, keyboardController }: Params<T>) {
    super();
    this.dataSourceController = dataSourceController;
    this.keyboardController = keyboardController;
  }

  public onScroll = ({ currentTarget }: Event) => {
    console.log(currentTarget);
  };
}
