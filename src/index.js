import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

const API_key = '30945884-5d04be7201908102dc9a782a9';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
const loadMoreBtn = document.querySelector('.load-more');
let pageNumber;
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMore);
let searchParam;
let lightbox;

async function handleSubmit(event) {
  event.preventDefault();
  pageNumber = 1;
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  searchParam = searchQuery;
  try {
    const data = await fetchPictures(searchQuery);
    const rendered = await renderGallery(data);
    gallery.innerHTML = rendered.join('');
    lightbox = new SimpleLightbox('.gallery a');
    loadMoreBtn.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
}

async function loadMore() {
  pageNumber += 1;
  const data = await fetchPictures(searchParam);
  rendered = await renderGallery(data);
  gallery.innerHTML += rendered.join('');
  lightbox.refresh();
}

async function fetchPictures(search) {
  const url = `https://pixabay.com/api/?key=${API_key}&q=${search.value
    .split(' ')
    .join(
      '+'
    )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;
  console.log(url);
  const imgs = await axios.get(url);
  console.log(imgs.data.hits);
  // const imgs = await response.data.json();
  console.log(`"Hooray! We found ${imgs.totalHits} images."`);

  if (imgs.totalHits / 40 < pageNumber - 1) {
    console.log("We're sorry, but you've reached the end of search results.");
    return;
  }
  return imgs.data.hits;
  // return imgs.hits.map(img => {
  //   return {
  //     webformatURL: img.webformatURL,
  //     largeImageURL: img.largeImageURL,
  //     tags: img.tags,
  //     likes: img.likes,
  //     views: img.views,
  //     comments: img.comments,
  //     downloads: img.downloads,
  //   };
  // });
}

async function renderGallery(array) {
  if (!array.length) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('visually-hidden');
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
