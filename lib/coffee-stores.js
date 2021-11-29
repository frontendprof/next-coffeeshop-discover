import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}&v=20211031&limit=${limit}`;
};

const getListOfCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee store',
    perPage: 40,
  });

  return photos.response.results.map((r) => r.urls['small']);
};

export const fetchCoffeeStores = async (
  latLong = '40.63274555893415, -74.0302701533644',
  limit = 6,
) => {
  const photos = await getListOfCoffeeStores();

  const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee stores', limit));
  const data = await response.json();

  return data.response.venues.map((v, idx) => {
    return {
      ...v,
      imgUrl: photos[idx],
    };
  });
};
