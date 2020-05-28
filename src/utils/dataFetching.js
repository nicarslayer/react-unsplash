import axios from 'axios';

const dataFetching = (currentQuerry) => {
  return axios.get(currentQuerry).then((response) => {
    return response.data;
  });
};
export default dataFetching;
