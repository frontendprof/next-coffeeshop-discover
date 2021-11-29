import { useEffect, useState } from 'react';
import Head from 'next/head';
import Banner from '../components/banner';
import Card from '../components/card';
import s from '../styles/Home.module.css';
import Image from 'next/image';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}
export default function Home({ coffeeStores }) {
  const { handleTrackLocation, latLong, errMsg, isFindingLocation } = useTrackLocation();
  const [coffeeSts, setCoffeeSts] = useState('');
  const [coffeeStoreError, setCoffeeStoreError] = useState();
  useEffect(() => {
    const fetchCofStores = async () => {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          setCoffeeSts(fetchedCoffeeStores);
        } catch (error) {
          console.log({ error });
          setCoffeeStoreError(error.message);
        }
      }
      fetchCofStores();
    };
  }, [latLong]);

  const handleOnBannerClick = () => {
    handleTrackLocation();
  };
  return (
    <div className={s.container}>
      <Head>
        <title>QahwaXona</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={s.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating ...' : 'View stores nearby'}
          handleOnClick={handleOnBannerClick}
        />
        {errMsg && `Something went wrong: ${errMsg}`}
        {coffeeStoreError && `Something went wrong: ${coffeeStoreError}`}
        <div className={s.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="store_images" />
        </div>
        {coffeeSts.length ? (
          <div className={s.sectionWrapper}>
            <h2 className={s.heading2}>Stores near me</h2>
            <div className={s.cardLayout}>
              {coffeeSts.map((cs) => {
                return (
                  <Card
                    key={cs.id}
                    name={cs.name}
                    imgUrl={
                      cs.imgUrl ||
                      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                    }
                    href={`/coffee-store/${cs.id}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className={s.sectionWrapper}>
            <h2 className={s.heading2}>Brookly Bay Ridge area stores</h2>
            <div className={s.cardLayout}>
              {coffeeStores.map((cs) => {
                return (
                  <Card
                    key={cs.id}
                    name={cs.name}
                    imgUrl={
                      cs.imgUrl ||
                      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                    }
                    href={`/coffee-store/${cs.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
