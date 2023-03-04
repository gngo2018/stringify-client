import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useAuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      localStorage.setItem('userRole', 'guest')
    }
  }, [])
  const {isAdmin} = useAuthContext();
  return (
    <div className={styles.container}>
      <Head>
        <title>Stringify</title>
        <meta name="description" content="Generated by create next app" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.image}>
          <Image
            src='/assets/StringifyLogoMain.png'
            objectFit='contain'
            alt='home-logo'
            layout='fill'
          />
        </div>
        <div className={styles.grid}>
          <Link legacyBehavior href='/Clients'>
            <a className={styles.card}>
              <h2>Clients &rarr;</h2>
              <p>Create and manage client requests and information</p>
            </a>
          </Link>
          <Link legacyBehavior href='/StringJobs'>
            <a className={styles.card}>
              <h2>String Jobs &rarr;</h2>
              <p>Create and view detailed information about string jobs</p>
            </a>
          </Link>
          <Link legacyBehavior href='/Rackets'>
            <a className={styles.card}>
              <h2>Rackets &rarr;</h2>
              <p>Page to view all rackets clients are using</p>
            </a>
          </Link>
          <Link legacyBehavior href='/ClientRackets'>
            <a className={styles.card}>
              <h2>Client Rackets &rarr;</h2>
              <p>Assign rackets to clients by serial number</p>
            </a>
          </Link>
          {isAdmin && (
            <Link legacyBehavior href='/Analytics'>
              <a className={styles.card}>
                <h2>Analytics &rarr;</h2>
                <p>Page to view analytics about clients and rackets. Coming soon!</p>
              </a>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
