import DropdownController from './ui-controllers/dropdown-controller';
import { CountriesControllers, LangsControllers } from './controllers/provider';

export function App() {
  return (
    <>
      <LangsControllers.Consumer>
        {(value) => <DropdownController controllers={value} />}
      </LangsControllers.Consumer>
      <CountriesControllers.Consumer>
        {(value) => <DropdownController controllers={value} />}
      </CountriesControllers.Consumer>
    </>
  );
}

export default App;
