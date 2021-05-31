import axios from 'axios';

const postScore = (url, name, score) => {
  axios.post(url, { user: name, score })
    .then((response) => response.data).catch((error) => error);

  return axios.post(url, { user: name, score });
};

export default postScore;