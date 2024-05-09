import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/system'

import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
