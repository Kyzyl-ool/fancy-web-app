import { DataSourceController } from '@fancy-web-app/smart-suggests';
import axios from 'axios';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Memoizer } from '@fancy-web-app/memoizer';

const PAGE_SIZE = 10;

export interface Option {
  key: string;
  label: string;
}

const memoizer = new Memoizer({ cacheMaxSize: 100 });

export class MemoizedDataSourceController extends DataSourceController<Option> {
  endpoint: string;

  constructor(endpoint: string) {
    super({ pageSize: PAGE_SIZE, bufferSize: PAGE_SIZE * 2 });
    this.endpoint = endpoint;
    this.init();
  }

  protected _fetchPage = memoizer.memoizeFn(
    async (search: string, pageNumber: number): Promise<Option[]> => {
      const { data } = await axios.get(this.endpoint, {
        params: {
          'page-size': PAGE_SIZE,
          'page-number': pageNumber,
          search: search,
        },
      });

      return data;
    }
  );

  protected predicate = (option: Option, search: string): boolean =>
    option.label.toLowerCase().includes(search.toLowerCase());
}
