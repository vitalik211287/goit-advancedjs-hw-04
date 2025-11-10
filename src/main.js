import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  appendGallery,
} from './js/render-functions.js';

function showBtm() {
  if (refs.loadBtm) refs.loadBtm.classList.remove('is-hidden');
}

function hideBtm() {
  if (refs.loadBtm) refs.loadBtm.classList.add('is-hidden');
}

const refs = {
  searchForm: document.querySelector('form.form'),
  queryInput: document.querySelector('form.form [name="query"]'),
  gallery: document.querySelector('.js-gallery'),
  loadBtm: document.querySelector('.load-btm'),
};

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadBtm.addEventListener('click', onLoadMoreBtnClick);

let pageX = 1;
let currentQuery = '';
let totalLoaded = 0;
let totalAvailable = 0;

async function onSearchSubmit(e) {
  e.preventDefault();
  const { target: searchForm } = e;
  const query = searchForm.elements.query.value.trim();
  if (query.length === 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  pageX = 1;
  totalLoaded = 0;
  totalAvailable = 0;
  refs.gallery.innerHTML = '';
  showLoader();
  hideBtm();

  try {
    const { data } = await fetchImages(currentQuery, pageX);
    totalAvailable = data.totalHits ?? 0;

    const hasResults = renderGallery(refs.gallery, data.hits);

    if (!hasResults) {
      iziToast.info({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    totalLoaded = data.hits.length;

    if (totalLoaded < totalAvailable) {
      showBtm();
    } else {
      hideBtm();
    }
  } catch (err) {
    if (err.status === 404 || err.status === '404') {
      iziToast.error({
        title: '❌ 404 Not Found',
        message: 'The requested resource was not found or does not exist.',
        position: 'topRight',
      });
    } else {
      iziToast.error({
        title: '⚠️ Request Error',
        message: err?.message || 'A network or unexpected error occurred.',
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
    totalLoaded += data.hits.length;
    if (totalLoaded >= data.totalHits || data.hits.length === 0) {
      hideBtm();
      refs.loadBtm.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.info({
        title: 'End of Results',
        message:
          "We're sorry, but you've reached the end of the search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      title: '⚠️ Request Error',
      message: err?.message || 'A network or unexpected error occurred.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
