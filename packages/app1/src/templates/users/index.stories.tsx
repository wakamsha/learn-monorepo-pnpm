import { Users } from '.';

export default {
  component: Users,
  decorators: [
    (Story: any) => (
      <div id="foo">
        <Story />
      </div>
    ),
  ],
};

export const Basic = {};
