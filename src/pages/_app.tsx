import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/system'
import { Open_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { useRouter } from 'next/router'
import NewHeader from '@/components/newHeader'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
const openSans = Open_Sans({ subsets: ['latin'], weight: '500' })

export default function App({ Component, pageProps }: AppProps) {
  const [sidebar, setSidebar] = useState<boolean | undefined>()
  const [isLg, setIsLg] = useState<boolean>(false)
  const router = useRouter()
  const noHeaderRoutes = ['/']
  const selectedRoutes = [
    '/dashboard',
    '/marketplaces/cadastrar',
    /^\/marketplaces\/\d+\/cadastrar-filho$/,
    '/marketplaces/[id]/[nomefantasia]/adicionar-ssl',
    '/marketplaces/[id]/cadastrar-filho',
    '/marketplaces/[id]/renovar-cache',
  ]
  const showSiderbar = () => setSidebar(!sidebar)
  const closeSideBar = () => setSidebar(false)
  useEffect(() => {
    const checkIsLg = () => {
      setIsLg(window.innerWidth >= 1024)
    }

    // Verificar a largura da janela inicialmente
    checkIsLg()

    // Adicionar event listener para verificar a largura da janela
    window.addEventListener('resize', checkIsLg)

    // Limpar event listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', checkIsLg)
    }
  }, [])

  useEffect(() => {
    if (isLg && selectedRoutes.includes(router.pathname)) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [isLg, router.pathname])

  return (
    <NextUIProvider>
      <main className={openSans.className}>
        <Toaster position="top-center" />
        {!noHeaderRoutes.includes(router.pathname) && (
          <NewHeader closeSideBar={closeSideBar} showSiderbar={showSiderbar} />
        )}
        {sidebar && (
          <Sidebar
            closeSidebar={closeSideBar}
            active={sidebar}
            onClick={showSiderbar}
          />
        )}
        <div
          style={{
            marginLeft: sidebar
              ? isLg
                ? '300px'
                : window.innerWidth <= 768
                  ? '100px'
                  : '250px'
              : '0',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <Component {...pageProps} />
        </div>
      </main>
    </NextUIProvider>
  )
}
