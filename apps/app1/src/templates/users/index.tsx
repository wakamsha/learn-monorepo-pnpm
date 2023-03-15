import { request } from '@learn-monorepo-pnpm/core/src/utils/Api';
import { useEffect, useState } from 'react';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const req = async () => {
      const result = await requestGetUsers();

      setUsers(result);
    };
    req();
  }, []);

  return (
    <div>
      <h1>users page</h1>
      <pre>
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </div>
  );
};

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

function requestGetUsers(): Promise<User[]> {
  return request<Record<string, unknown>, User[]>({
    method: 'GET',
    path: '/users',
    ...{
      withCredentials: false,
    },
  });
}
