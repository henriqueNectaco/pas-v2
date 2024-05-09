import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/system'
import { Open_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

const openSans = Open_Sans({ subsets: ['latin'], weight: '500' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className={openSans.className}>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  )
}
