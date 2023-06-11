import { type Meta, type StoryObj } from '@storybook/react';
import { FormLabel } from '.';

export default {
  component: FormLabel,
} as Meta<typeof FormLabel>;

/**
 * `children` に input 要素を渡すと縦方向に並びます。
 */
export const Nested: StoryObj<typeof FormLabel> = {
  args: {
    label: 'メールアドレス',
    children: <input type="email" placeholder="taro@example.com" />,
  },
};

/**
 * ラベルと input 要素を横一列に並べるには `htmlFor` を使います。
 */
export const Horizontal: StoryObj<typeof FormLabel> = {
  args: {
    label: 'メールアドレス',
    htmlFor: `${Math.random()}`,
  },
  argTypes: {
    label: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  render: ({ htmlFor = 'bbb', label }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <FormLabel label={label} htmlFor={htmlFor} />
      <input type="email" id={htmlFor} placeholder="taro.ringo@example.com" />
    </div>
  ),
};
