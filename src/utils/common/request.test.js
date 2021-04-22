import request from './request';

describe('request', () => {
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', () =>
      request('/thisurliscorrect').then(json => {
        expect(json.hello).toBe('world');
        return;
      }));
  });

  describe('stubbing error response', () => {
    beforeEach(() => {
      const res = new Response('{"errorMessage":"Not found"}', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should have correct status errors', () =>
      request('/thisdoesntexist').then(json => {
        expect(json.status).toBe(404);
        expect(json.errorMessage).toBe('Not found');
        return true;
      }));
  });
});
