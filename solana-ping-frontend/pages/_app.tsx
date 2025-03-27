import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider = dynamic(
  () => import('../contexts/WalletConnectionProvider'),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <Component {...pageProps} />
    </WalletConnectionProvider>
  );
}

export default MyApp;
