import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const API_key = '30945884-5d04be7201908102dc9a782a9';

// const url = `https://pixabay.com/api/?key=${API_key}&q=${API_key}&image_type=photo&orientation=horizontal&safesearch=true`;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let pageNumber;
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMore);
let searchParam;

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
    const lightbox = new SimpleLightbox('.gallery a');
    loadMoreBtn.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
}

async function loadMore() {
  pageNumber += 1;
  const data = await fetchPictures(searchParam);
  let morePics = '';
  morePics += await renderGallery(data);
  gallery.innerHTML = morePics;
}

async function fetchPictures(search) {
  // pageNumber += 1;
  const url = `https://pixabay.com/api/?key=${API_key}&q=${search.value
    .split(' ')
    .join(
      '+'
    )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;
  console.log(url);
  const response = await fetch(url);
  const imgs = await response.json();
  console.log(`"Hooray! We found ${imgs.totalHits} images."`);

  if (imgs.totalHits / 40 < pageNumber - 1) {
    console.log("We're sorry, but you've reached the end of search results.");
    return;
  }
  return imgs.hits.map(img => {
    return {
      webformatURL: img.webformatURL,
      largeImageURL: img.largeImageURL,
      tags: img.tags,
      likes: img.likes,
      views: img.views,
      comments: img.comments,
      downloads: img.downloads,
    };
  });

  // console.log(array);
}

async function renderGallery(array) {
  if (!array.length) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('visually-hidden');
    // pageNumber = 1;
  } else {
    return array.map(
      img =>
        `<a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" /></a>`
    );
  }
}

// <div class="info">
//   <p class="info-item">
//     <b>Likes</b>${img.likes}
//   </p>
//   <p class="info-item">
//     <b>Views</b>${img.views}
//   </p>
//   <p class="info-item">
//     <b>Comments</b>${img.comments}
//   </p>
//   <p class="info-item">
//     <b>Downloads</b>${img.downloads}
//   </p>
// </div>;
