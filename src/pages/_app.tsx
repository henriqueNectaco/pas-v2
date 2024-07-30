import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/system'
import { Open_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { useRouter } from 'next/router';
import NewHeader from '@/components/newHeader'
const openSans = Open_Sans({ subsets: ['latin'], weight: '500' })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderRoutes = ['/'];
  return (
    <NextUIProvider>
      <main className={openSans.className}>
        <Toaster position="top-center" />
        {!noHeaderRoutes.includes(router.pathname) && <NewHeader />}
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  )
}
