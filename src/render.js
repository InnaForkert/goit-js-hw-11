export function renderGallery(array, pageNumber) {
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
