import { DataSourceController } from '@fancy-web-app/smart-suggests';
import axios from 'axios';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Memoizer } from '@fancy-web-app/memoizer';

const PAGE_SIZE = 10;

interface Option {
  key: string;
  label: string;
}

const memoizer = new Memoizer({ cacheMaxSize: 100 });

export class MemoizedDataSourceController extends DataSourceController<Option> {
  constructor() {
    super({ pageSize: PAGE_SIZE });
  }

  protected fetchPage = memoizer.memoizeFn(
    async (search: string, pageNumber: number): Promise<Option[]> => {
      const { data } = await axios.get('/api/langs', {
        params: {
          'page-size': PAGE_SIZE,
          'page-number': pageNumber,
          search: search,
        },
      });

      return data;
    }
  );

  protected predicate(option: Option, search: string): boolean {
    return option.label.toLowerCase().includes(search.toLowerCase());
  }
}
