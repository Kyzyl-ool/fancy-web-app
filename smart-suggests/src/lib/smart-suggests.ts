import EventEmitter from 'events';

interface Params {
  pageSize: number;
  bufferSize: number;
}

interface Option {
  key: string;
}

export abstract class DataSourceController<
  OptionType extends Option
> extends EventEmitter {
  protected pageSize: number;
  protected bufferSize: number;
  protected lastFetchedPage: number;
  protected selectedOptionsMap = new Map<string, OptionType>();
  protected searchResultsMap = new Map<string, OptionType>();
  protected hoveredOptionIndex = 0;
  public searchString = '';

  protected constructor({ pageSize, bufferSize }: Params) {
    super();

    this.pageSize = pageSize;
    this.bufferSize = bufferSize;
    this.lastFetchedPage = 0;
  }

  public init = async () => {
    this.fetchPage(this.searchString, 1);

    this.on('update', () => {
      if (
        this.searchResultsMap.size - this.selectedOptionsMap.size <
        this.bufferSize
      ) {
        this.fetchPage(this.searchString, this.lastFetchedPage + 1);
      }
    });
  };

  protected fetchPage = async (
    search: string,
    pageNumber: number
  ): Promise<OptionType[]> => {
    const result = await this._fetchPage(search, pageNumber);

    result.forEach((value) => {
      const { key } = value;

      this.searchResultsMap.set(key, value);
    });
    this.emit('update');
    this.lastFetchedPage = pageNumber;

    return result;
  };
  protected abstract _fetchPage(
    search: string,
    pageNumber: number
  ): Promise<OptionType[]>;

  protected abstract predicate(option: OptionType, search: string): boolean;

  public onSelectOption = (key: string) => {
    if (this.searchResultsMap.has(key)) {
      this.selectedOptionsMap.set(
        key,
        this.searchResultsMap.get(key) as OptionType
      );
      this.emit('update');
    } else {
      this.emit('error', `this.searchResults does not contain ${key}`);
    }
  };

  public onRemoveSelectedOption = (key: string) => {
    this.selectedOptionsMap.delete(key);
    this.emit('update');
  };
  public onRemoveLastOption = () => {
    if (this.selectedOptionsMap.size) {
      const lastOptionKey = [...this.selectedOptionsMap.keys()].at(-1);
      if (!lastOptionKey) {
        this.emit('error', 'Option to be deleted is absent');
        return;
      }
      this.onRemoveSelectedOption(lastOptionKey);
    }
  };

  public setSearchString = (search: string) => {
    this.searchString = search;
    this.emit('update');
  };
  get options(): OptionType[] {
    return [...this.searchResultsMap.values()].filter(
      (option) =>
        !this.selectedOptionsMap.has(option.key) &&
        this.predicate(option, this.searchString)
    );
  }
  get selectedOptions(): OptionType[] {
    return [...this.selectedOptionsMap.values()];
  }
  get hoveredOptionKey(): string {
    return this.options[this.hoveredOptionIndex].key;
  }
  onArrowUp = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex - 1 + this.options.length) % this.options.length;
    this.emit('update');
  };
  onArrowDown = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex + 1) % this.options.length;
    this.emit('update');
  };
}
