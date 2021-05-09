import postScore from '../postScore';

describe('postScore', () => {
  test('posts score to the api for a given player name', () => {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/J0cS5gwuXEpiiRrDlkUW/scores/';
    return postScore(url, 50).then((data) => {
      expect(data.status).toBe(201);
    });
  });
});