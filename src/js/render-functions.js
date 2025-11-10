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
      <p class="info-item"><b>Likes</b> <span>${likes}</span></p>
      <p class="info-item"><b>Views</b> <span>${views}</span></p>
      <p class="info-item"><b>Comments</b> <span>${comments}</span></p>
      <p class="info-item"><b>Downloads</b> <span>${downloads}</span></p>
    </div>
  </li>
`;
}

let lightbox = null;

function ensureLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.js-gallery a.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function renderGallery(containerEl, hits) {
  if (!hits?.length) {
    containerEl.innerHTML = '';
    return false;
  }
  containerEl.innerHTML = hits.map(createGalleryCardTemplate).join('');
  ensureLightbox();
  return true;
}

export function showLoader() {
  const el = document.getElementById('loader');
  if (el) el.classList.remove('is-hidden');
}

export function hideLoader() {
  const el = document.getElementById('loader');
  if (el) el.classList.add('is-hidden');
}

export function appendGallery(containerEl, data) {
  if (!data?.length) return;
  const html = data.map(createGalleryCardTemplate).join('');
  containerEl.insertAdjacentHTML('beforeend', html);
  ensureLightbox();
}
