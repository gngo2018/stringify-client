import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header/Header'
import { AuthContext } from '../contexts/AuthContext'
import '../styles/globals.css'

const secret = process.env.NEXTAUTH_SECRET
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
          <Header />
          <Component {...pageProps} />
        </AuthContext.Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
