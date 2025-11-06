import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const refs = {
  searchForm: document.querySelector('form.form'),
  queryInput: document.querySelector('form.form [name="query"]'),
  gallery: document.querySelector('.js-gallery'),
};

refs.searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(e) {
  e.preventDefault();
  const { target: searchForm } = e;
  const query = searchForm.elements.query.value.trim();
  if (query.length === 0) {
    iziToast.warning({ title: 'Увага', message: 'Введи пошуковий запит' });
    return;
  }

  refs.gallery.innerHTML = '';
  showLoader();

  try {
    const { data } = await fetchImages(query);
    console.log(data);
    renderGallery(refs.gallery, data.hits);
  } catch (err) {
    if (err.status === 404 || err.status === '404') {
      iziToast.error({
        title: '❌ 404 Not Found',
        message: 'Ресурс не знайдено або не існує.',
        position: 'topRight',
      });
    } else {
      iziToast.error({
        title: '⚠️ Помилка запиту',
        message: err?.message || 'Виникла мережева або інша помилка.',
        position: 'topRight',
      });
    }
  } finally {
    hideLoader();
  }
}
