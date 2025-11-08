import axios from 'axios';
// import { refs, pageX } from '../main.js';

const API_KEY = '30108062-264069135fbcff220b3f8c28b';
const BASE_URL = 'https://pixabay.com/api/';


// console.log(pageX);

export function fetchImages(query, pageX) {
  const axiosParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageX,
    per_page: 15,
  };

  return axios.get(BASE_URL, { params: axiosParams });
}

