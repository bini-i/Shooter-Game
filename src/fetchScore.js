const fetch = require('node-fetch');

const fetchScore = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.result);

  return fetch(url);
};

export default fetchScore;