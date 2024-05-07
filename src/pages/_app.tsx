import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/system'
import { Roboto, Libre_Franklin, Open_Sans } from '@next/font/google'
import { Toaster } from 'sonner'
import Header from '../components/Header/index'

const roboto = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className={roboto.className}>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  )
}
