import EventEmitter from 'events';

interface Params {
  pageSize: number;
}

interface Option {
  key: string;
}

export abstract class DataSourceController<
  OptionType extends Option
> extends EventEmitter {
  protected pageSize: number;
  protected selectedOptions: Record<string, OptionType> = {};
  protected searchResults: Record<string, OptionType> = {};
  public searchString = '';

  protected constructor({ pageSize }: Params) {
    super();

    this.pageSize = pageSize;
  }

  protected fetchPage = async (
    search: string,
    pageNumber: number
  ): Promise<OptionType[]> => {
    const result = await this._fetchPage(search, pageNumber);

    result.forEach((value) => {
      const { key } = value;

      this.searchResults[key] = value;
    });
    this.emit('update');

    return result;
  };
  protected abstract _fetchPage(
    search: string,
    pageNumber: number
  ): Promise<OptionType[]>;

  protected abstract predicate(option: OptionType, search: string): boolean;

  public onSelectOption = (key: string) => {
    this.selectedOptions[key] = this.searchResults[key];
  };

  public onRemoveSelectedOption = (key: string) => {
    delete this.selectedOptions[key];
  };

  public setSearchString = (search: string) => {
    this.searchString = search;
    this.emit('update');
  };
  get options(): OptionType[] {
    return Object.values(this.searchResults).filter((option) =>
      this.predicate(option, this.searchString)
    );
  }
}
