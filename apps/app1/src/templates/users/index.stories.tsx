import { mswDecorator } from '@learn-monorepo-pnpm/core/src/utils/Catalog';
import { Users } from '.';

type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  job?: string;
};

export default {
  component: Users,
  decorators: [
    mswDecorator((rest) => [
      rest.get('https://jsonplaceholder.typicode.com/users', (_, res, ctx) =>
        res(
          ctx.json<User[]>([
            {
              id: 1,
              name: 'wakamsha',
            },
          ]),
        ),
      ),
    ]),
  ],
};

export const Basic = {};
