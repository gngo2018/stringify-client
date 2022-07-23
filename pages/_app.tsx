import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { AuthContext } from '../contexts/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
      <Header />
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
