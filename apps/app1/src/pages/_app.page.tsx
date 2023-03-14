import '@learn-monorepo-pnpm/core/src/styles/app.scss';
import { type AppProps } from 'next/app';
import Link from 'next/link';

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <ul>
      <li>
        <Link href="/home" as="/">
          home
        </Link>
      </li>
      <li>
        <Link href="/users">users</Link>
      </li>
    </ul>
    <hr />
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pageProps}
    />
  </div>
);
export default App;
