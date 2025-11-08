import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  showBtm,
  appendGallery,
} from './js/render-functions.js';

export const refs = {
  searchForm: document.querySelector('form.form'),
  queryInput: document.querySelector('form.form [name="query"]'),
  gallery: document.querySelector('.js-gallery'),
  loadBtm: document.querySelector('.load-btm'),
};

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadBtm.addEventListener('click', onLoadMoreBtnClick);

let pageX = 1;
let currentQuery = '';

async function onSearchSubmit(e) {
  e.preventDefault();
  const { target: searchForm } = e;
  const query = searchForm.elements.query.value.trim();
  if (query.length === 0) {
    iziToast.warning({ title: 'Увага', message: 'Введи пошуковий запит' });
    return;
  }

  currentQuery = query;
  pageX = 1;
  refs.gallery.innerHTML = '';
  showLoader();

  try {
    const { data } = await fetchImages(currentQuery, pageX);
    renderGallery(refs.gallery, data.hits);
    showBtm();
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

export async function onLoadMoreBtnClick() {
  if (!currentQuery) return;
  pageX++;
  showLoader();
  try {
    const { data } = await fetchImages(currentQuery, pageX);
    appendGallery(refs.gallery, data.hits);
  } catch (err) {
    iziToast.error({
      title: '⚠️ Помилка запиту',
      message: err?.message || 'Виникла мережева або інша помилка.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
