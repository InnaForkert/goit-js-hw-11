import Notiflix from 'notiflix';
import { scrollEnd } from '.';

const axios = require('axios').default;
const API_key = '30945884-5d04be7201908102dc9a782a9';

export async function fetchPictures(search, pageNumber) {
  const url = `https://pixabay.com/api/?key=${API_key}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;
  const imgs = await axios.get(url);
  if (imgs.data.hits.length < 40) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    gallery.removeEventListener('scroll', scrollEnd);
    return;
  }
  return imgs.data;
}
