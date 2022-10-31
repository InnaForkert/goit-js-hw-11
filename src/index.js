import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { renderGallery } from './render';
import { fetchPictures } from './fetch';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let pageNumber;
let searchParam;
let lightbox;

form.addEventListener('submit', handleSubmit);
gallery.addEventListener('scroll', scrollEnd);

async function handleSubmit(event) {
  pageNumber = 1;
  gallery.addEventListener('scroll', scrollEnd);
  event.preventDefault();
  let {
    elements: { searchQuery },
  } = event.currentTarget;
  searchParam = searchQuery.value.replaceAll(' ', '+');
  const data = await fetchPictures(searchParam, pageNumber);
  if (data.totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  const rendered = await renderGallery(data.hits, pageNumber);
  gallery.innerHTML = rendered.join('');
  lightbox = new SimpleLightbox('.gallery .gallery-div a');
}

async function loadMore() {
  pageNumber += 1;
  const data = await fetchPictures(searchParam, pageNumber);
  const rendered = await renderGallery(data.hits, pageNumber);
  gallery.innerHTML += rendered.join('');
  lightbox.refresh();
}

export function scrollEnd() {
  if (gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 10) {
    loadMore();
  }
}
