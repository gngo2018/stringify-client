import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter();
  const {isAdmin} = useAuthContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Stringify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
          <Link href='/Clients'>
            <div className={styles.card}>
              <h2>Clients &rarr;</h2>
              <p>Create and manage client requests and information</p>
            </div>
          </Link>
          <Link href='/StringJobs'>
            <div className={styles.card}>
              <h2>String Jobs &rarr;</h2>
              <p>Create and view detailed information about string jobs</p>
            </div>
          </Link>
          <Link href='/Rackets'>
            <div className={styles.card}>
              <h2>Rackets &rarr;</h2>
              <p>Page to view all rackets clients are using</p>
            </div>
          </Link>
          <Link href='/ClientRackets'>
            <div className={styles.card}>
              <h2>Client Rackets &rarr;</h2>
              <p>Assign rackets to clients by serial number</p>
            </div>
          </Link>
          {isAdmin && (
            <Link href='/Analytics'>
              <div className={styles.card}>
                <h2>Analytics &rarr;</h2>
                <p>Page to view analytics about clients and rackets. Coming soon!</p>
              </div>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
