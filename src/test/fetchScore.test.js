import fetchScore from '../fetchScore';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve({ data: 200 }),
  });
});

describe('fetchScore', () => {
  test('fetches score list from the API', () => {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/J0cS5gwuXEpiiRrDlkUW/scores/';
    return fetchScore(url).then((result) => {
      expect(result.status).toEqual(200);
    });
  });
});