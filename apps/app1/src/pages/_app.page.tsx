import '@learn-monorepo-pnpm/core/src/styles/app.scss';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Component
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...pageProps}
  />
);
export default App;
