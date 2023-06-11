import { useState } from 'react';
import { useDebouncedState } from '.';

export default {
  title: 'hooks/useDebouncedState',
};

export const Basic = {
  render: () => {
    const [delay, setDelay] = useState(1000);

    const [value, debouncedValue, setValue] = useDebouncedState('', delay);

    return (
      <>
        <div>
          <label>
            Value:
            <input value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Delay:
            <input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
          </label>
        </div>
        <code>
          <pre>{JSON.stringify(debouncedValue, null, 2)}</pre>
        </code>
      </>
    );
  },
};
