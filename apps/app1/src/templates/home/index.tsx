import { FormLabel } from '@learn-monorepo-pnpm/core/components/inputs/FormLabel';
import { useDebouncedState } from '@learn-monorepo-pnpm/core/hooks/useDebouncedState';
import { useState } from 'react';
import styles from './index.module.scss';

export const Home = () => {
  const [delay, setDelay] = useState(1000);
  const [value, debouncedValue, setValue] = useDebouncedState('', delay);

  return (
    <div className={styles.base}>
      <h1>hello next.js app1</h1>

      <hr />

      <FormLabel label="メールアドレス">
        <input type="email" placeholder="taro.ringo@example.com" />
      </FormLabel>

      <hr />

      <div>
        <label>
          Value:
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
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
    </div>
  );
};
