import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

export function createGalleryCardTemplate({
  downloads,
  comments,
  views,
  likes,
  tags,
  webformatURL,
  largeImageURL,
}) {
  return `
    <li class="gallery-card">
     <a class="gallery-item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image" />
  </a>
      <div class="info">
    <p class="info-item">
      <b>Likes </b>
       <span class="span_text">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
        <span class="span_text">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
       <span class="span_text">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
       <span class="span_text">${downloads}</span>
    </p>
  </div>
</div>
    </li>
  `;
}


export function renderGallery(containerEl, hits) {
  if (!hits?.length) {
    containerEl.innerHTML = `<li class="empty">Нічого не знайдено</li>`;
    return;
  }
  containerEl.innerHTML = hits.map(createGalleryCardTemplate).join('');

  
  const lightbox = new SimpleLightbox('.js-gallery .gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function showLoader() {
  const el = document.getElementById('loader');
  if (el) el.classList.remove('is-hidden');
}

export function hideLoader() {
  const el = document.getElementById('loader');
  if (el) el.classList.add('is-hidden');
}



