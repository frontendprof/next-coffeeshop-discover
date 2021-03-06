// import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import s from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const handleUpvoteButton = () => {
  console.log('handle upvote');
};

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log(coffeeStore);
  const { location, name, neighborhood, imgUrl } = coffeeStore;

  // const id = router.query.id;

  // const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  // const {
  //   state: { coffeeStores },
  // } = useContext(StoreContext);

  return (
    <div className={s.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`}></meta>
      </Head>
      <div className={s.container}>
        <div className={s.col1}>
          <div className={s.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={s.nameWrapper}>
            <h1 className={s.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={s.storeImg}
            alt={name}></Image>
        </div>

        <div className={cls('glass', s.col2)}>
          <div className={s.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt="places icon" />
            <p className={s.text}>{location.address}</p>
          </div>
          {neighborhood && (
            <div className={s.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="near me icon" />
              <p className={s.text}>{location.neighborhood}</p>
            </div>
          )}
          <div className={s.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="star icon" />
            {/* <p className={s.text}>{votingCount}</p> */}
          </div>

          <button className={s.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

// =================================
// import { useContext, useEffect, useState } from "react";

// import useSWR from "swr";

// import { fetchCoffeeStores } from "../../lib/coffee-stores";

// import { StoreContext } from "../../store/store-context";

// import { isEmpty } from "../../utils";

// export async function getStaticProps(staticProps) {
//   const params = staticProps.params;

//   const coffeeStores = await fetchCoffeeStores();
//   const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
//     return coffeeStore.id.toString() === params.id; //dynamic id
//   });
//   return {
//     props: {
//       coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
//     },
//   };
// }

//   const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

//   const {
//     state: { coffeeStores },
//   } = useContext(StoreContext);

//   const handleCreateCoffeeStore = async (coffeeStore) => {
//     try {
//       const { id, name, voting, imgUrl, neighbourhood, address } = coffeeStore;
//       const response = await fetch("/api/createCoffeeStore", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           name,
//           voting: 0,
//           imgUrl,
//           neighbourhood: neighbourhood || "",
//           address: address || "",
//         }),
//       });

//       const dbCoffeeStore = await response.json();
//     } catch (err) {
//       console.error("Error creating coffee store", err);
//     }
//   };

//   useEffect(() => {
//     if (isEmpty(initialProps.coffeeStore)) {
//       if (coffeeStores.length > 0) {
//         const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
//           return coffeeStore.id.toString() === id; //dynamic id
//         });

//         if (coffeeStoreFromContext) {
//           setCoffeeStore(coffeeStoreFromContext);
//           handleCreateCoffeeStore(coffeeStoreFromContext);
//         }
//       }
//     } else {
//       // SSG
//       handleCreateCoffeeStore(initialProps.coffeeStore);
//     }
//   }, [id, initialProps, initialProps.coffeeStore]);

//   const { address, name, neighbourhood, imgUrl } = coffeeStore;

//   const [votingCount, setVotingCount] = useState(0);

//   const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setCoffeeStore(data[0]);

//       setVotingCount(data[0].voting);
//     }
//   }, [data]);

//   const handleUpvoteButton = async () => {
//     try {
//       const response = await fetch("/api/favouriteCoffeeStoreById", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//         }),
//       });

//       const dbCoffeeStore = await response.json();

//       if (dbCoffeeStore && dbCoffeeStore.length > 0) {
//         let count = votingCount + 1;
//         setVotingCount(count);
//       }
//     } catch (err) {
//       console.error("Error upvoting the coffee store", err);
//     }
//   };

//   if (error) {
//     return <div>Something went wrong retrieving coffee store page</div>;
//   }

//
