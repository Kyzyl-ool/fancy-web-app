import React from 'react';
import {
  DataSourceController,
  KeyboardController,
} from '@fancy-web-app/smart-suggests';
import { MemoizedDataSourceController, Option } from './data-source-controller';

export interface Controllers {
  dataSourceController: DataSourceController<Option>;
  keyboardController: KeyboardController<Option>;
}

const langsDataSourceController = new MemoizedDataSourceController(
  '/api/langs'
);
const langsKeyboardController = new KeyboardController({
  dataSourceController: langsDataSourceController,
});
export const LangsControllers = React.createContext<Controllers>({
  dataSourceController: langsDataSourceController,
  keyboardController: langsKeyboardController,
});

const countriesDataSourceController = new MemoizedDataSourceController(
  '/api/countries'
);
const countriesKeyboardController = new KeyboardController({
  dataSourceController: countriesDataSourceController,
});
export const CountriesControllers = React.createContext<Controllers>({
  dataSourceController: countriesDataSourceController,
  keyboardController: countriesKeyboardController,
});
