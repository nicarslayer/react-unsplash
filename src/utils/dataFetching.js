import axios from 'axios';

const dataFetching = (currentPage, request, clientId) => {
  return axios
    .get(
      'https://api.unsplash.com/search/photos?per_page=30&page=' +
        currentPage +
        '&query=' +
        request +
        clientId
    )
    .then((response) => {
      return response.data;
    });
};
export default dataFetching;
