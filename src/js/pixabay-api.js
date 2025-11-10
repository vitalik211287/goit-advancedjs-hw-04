import axios from 'axios';

const API_KEY = '30108062-264069135fbcff220b3f8c28b';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, pageX) {
  const axiosParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageX,
    per_page: PER_PAGE,
  };
  const { data } = await axios.get(BASE_URL, { axiosParams });
  return data;
}
