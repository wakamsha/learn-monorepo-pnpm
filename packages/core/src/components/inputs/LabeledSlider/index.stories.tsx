import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledSlider } from '.';

export default {
  component: LabeledSlider,
} as Meta<typeof LabeledSlider>;

export const Usage: StoryObj<typeof LabeledSlider> = {
  /*
  不要。
  Story 名のエイリアス。
  予約語や emoji を story 名に使用する際に使えるが、これが必要となるユースケースは無いため。
  */
  // name: 'hello world',

  /*
  使用。
  対象コンポーネントの Props 値を設定でき、それぞれを Addon view の `Controls` タブ上で動的に変更できる。
  各設定値は `render` の引数に渡る。
   */
  args: {
    label: 'Weight',
    unit: 'kg',
    min: 40,
    max: 150,
  },

  /*
  使用。
  `args` で設定した値を引数に受け取れる。
  `render` 関数内での hook の使用は ESLint によって禁止されているが、
  これを回避するために render に渡す関数を関数式として別途定義するのは冗長なため、
  `*.stories.tsx` に対してこのルールを無効化する。
   */
  render: ({ label, unit, min, max }) => {
    const [value, setValue] = useState(60);

    return <LabeledSlider label={label} unit={unit} min={min} max={max} value={value} onChange={setValue} />;
  },
};

export const BmiChecker: StoryObj<typeof LabeledSlider> = {
  render: () => {
    const [weight, setWeight] = useState(60);
    const [height, setHeight] = useState(170);

    const heightMeters = height * 0.01;
    const bmi = Math.round(weight / (heightMeters * heightMeters));

    return (
      <>
        <LabeledSlider label="Weight" unit="kg" min={40} max={150} value={weight} onChange={setWeight} />
        <LabeledSlider label="Height" unit="cm" min={140} max={220} value={height} onChange={setHeight} />
        <p>BMI: {bmi}</p>
      </>
    );
  },
};
