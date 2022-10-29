import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
const axios = require('axios').default;

const API_key = '30945884-5d04be7201908102dc9a782a9';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let pageNumber;
let searchParam;
let lightbox;

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  pageNumber = 1;
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  searchParam = searchQuery.value.replaceAll(' ', '+');
  const data = await fetchPictures(searchParam);
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  const rendered = await renderGallery(data.hits);
  gallery.innerHTML = rendered.join('');
  lightbox = new SimpleLightbox('.gallery a');
}

async function loadMore() {
  pageNumber += 1;
  const data = await fetchPictures(searchParam);
  const rendered = await renderGallery(data);
  gallery.innerHTML += rendered.join('');
  lightbox.refresh();
}

async function fetchPictures(search) {
  const url = `https://pixabay.com/api/?key=${API_key}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;
  const imgs = await axios.get(url);
  if (imgs.totalHits / 40 < pageNumber - 1) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  return imgs.data;
}

function renderGallery(array) {
  if (!array.length) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
  } else {
    return array.map(
      img =>
        `<a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" /></a>        
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${img.likes}
          </p>
          <p class="info-item">
            <b>Views</b>${img.views}
          </p>
          <p class="info-item">
            <b>Comments</b>${img.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${img.downloads}
          </p>
        </div>;`
    );
  }
}

gallery.addEventListener('scroll', function () {
  console.log(
    gallery.scrollTop,
    gallery.clientHeight,
    gallery.scrollHeight - 10
  );
  if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 10) {
    loadMore();
  }
});
