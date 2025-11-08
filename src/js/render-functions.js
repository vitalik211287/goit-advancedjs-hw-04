import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { refs } from '../main.js';



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

export function renderGallery(containerEl, hits) {
  if (!hits?.length) {
    iziToast.info({
      title: 'Info',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    containerEl.innerHTML = '';
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

export function showBtm() {
  if (refs.loadBtm) refs.loadBtm.classList.remove('is-hidden');
}


export function appendGallery(containerEl, data) {
  if (!data?.length) return;
  const html = data.map(createGalleryCardTemplate).join('');
  containerEl.insertAdjacentHTML('beforeend', html);
  // якщо використовуєш SimpleLightbox — не забудь refresh()
}