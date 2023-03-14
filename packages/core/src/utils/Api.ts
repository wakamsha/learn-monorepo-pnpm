type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function request<REQ extends Record<string, unknown>, RES>({
  method,
  path,
  token,
  send,
  withCredentials,
}: {
  method: Method;
  path: string;
  token?: string;
  send?: REQ;
  withCredentials: boolean;
}): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const url = `https://jsonplaceholder.typicode.com${path}`;

  const response = await fetch(url, {
    headers,
    method,
    credentials: withCredentials ? 'include' : 'omit',
    ...(send ? { body: JSON.stringify(send) } : {}),
  });

  if (!response.ok) {
    // 共通のエラー処理があれば、ここに実装する。
    const error = await response.json();
    throw {
      code: response.status,
      ...error,
    };
  }

  return response.json();
}
