import { LabeledSlider } from '@learn-monorepo-pnpm/core/src/components/inputs/LabeledSlider';
import { useMemo, useState } from 'react';
import styles from './index.module.scss';

export const App = () => {
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(170);
  const calcBMI = useMemo(() => {
    const heightMeters = height * 0.01;
    return Math.round(weight / (heightMeters * heightMeters));
  }, [weight, height]);

  return (
    <div className={styles.base}>
      <h1>hello next.js app2</h1>

      <hr />

      <div>
        <LabeledSlider label="Weight" unit="kg" min={40} max={150} value={weight} onChange={setWeight} />
        <LabeledSlider label="Height" unit="cm" min={140} max={220} value={height} onChange={setHeight} />
        <p>BMI: {calcBMI}</p>
      </div>
    </div>
  );
};
