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
            <input
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Delay:
            <input
              type="number"
              value={delay}
              onChange={(event) => {
                setDelay(Number(event.target.value));
              }}
            />
          </label>
        </div>
        <code>
          <pre>{JSON.stringify(debouncedValue, null, 2)}</pre>
        </code>
      </>
    );
  },
};
