import Notiflix from 'notiflix';

export function renderGallery(array, pageNumber) {
  if (!array.length) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    if (pageNumber === 1) {
      gallery.innerHTML = '';
    }
    return;
  }
  return array.map(
    img =>
      `<div class="gallery-div">
          <a class="gallery-link" href="${img.largeImageURL}"><img src="${img.webformatURL}" class="gallery-image" alt="${img.tags}" loading="lazy" /></a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${img.likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${img.views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${img.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${img.downloads}
            </p>
          </div>
        </div>`
  );
}
