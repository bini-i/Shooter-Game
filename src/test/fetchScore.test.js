import fetchScore from '../fetchScore';

describe('fetchScore', () => {
  test('fetches score list from the API', () => {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/J0cS5gwuXEpiiRrDlkUW/scores/';
    return fetchScore(url).then((data) => {
      expect(data.status).toBe(200);
    });
  });
});