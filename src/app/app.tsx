import { Dropdown } from '@fancy-web-app/ui-kit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { noop } from 'rxjs';

export function App() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/langs');

      setOptions(data);
    })();
  }, []);

  return (
    <Dropdown
      options={options}
      isDropdownOpened
      hoveredOperandKey={''}
      hoveredOptionKey={''}
      onClick={noop}
      onSelect={noop}
      onDeselect={noop}
    />
  );
}

export default App;
