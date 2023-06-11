import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledSlider } from '.';

export default {
  component: LabeledSlider,
} as Meta<typeof LabeledSlider>;

export const Usage: StoryObj<typeof LabeledSlider> = {
  args: {
    label: 'Weight',
    unit: 'kg',
    min: 40,
    max: 150,
  },
  argTypes: {
    onChange: {
      action: 'changed',
    },
  },
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
