import axios from 'axios';

const postScore = (url, score) => {
  axios.post(url, { user: 'alex', score })
    .then((response) => response.data).catch((error) => error);

  return axios.post(url, { user: 'alex', score: 50 });
};

export default postScore;