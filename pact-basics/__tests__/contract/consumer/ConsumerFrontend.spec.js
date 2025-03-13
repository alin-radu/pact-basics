'use strict';

const { Matchers } = require('@pact-foundation/pact');
const { getClients, postClient } = require('../../../src/consumer/consumer');
const { eachLike, like } = require('@pact-foundation/pact/src/dsl/matchers');

const getUsersExpectedBody = [
  {
    id: 111,
    firstName: 'LisaChanged',
    lastName: 'SimpsonChanged',
    dateOfBirth: '01/01/2005',
    age: 255,
  },
];

const postUserBody = {
  firstName: 'Rafaela_REQUEST',
  lastName: 'Azevedo_REQUEST',
  dateOfBirth: '01/01/2005',
  age: 29,
};

const postUserExpectedBody = {
  id: 14,
  firstName: 'Rafaela',
  lastName: 'Azevedo',
  dateOfBirth: '01/01/2005',
  age: 20,
};

describe('Clients Service', () => {
  // Note: after each test if there are any errors these will be logged and the test will fail;
  afterEach(() => provider.verify());

  // getClients
  describe('GET Clients', () => {
    // the test setup;
    beforeEach(() => {
      const interaction = {
        state: 'i have a list of clients',
        uponReceiving: 'a request for all clients',
        withRequest: {
          method: 'GET',
          path: '/clients',
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: eachLike(getUsersExpectedBody[0], { min: 1 }),
        },
      };

      return provider.addInteraction(interaction);
    });

    // the test
    test('returns correct body, header and statusCode', async () => {
      const response = await getClients();
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            dateOfBirth: expect.any(String),
            age: expect.any(Number),
          }),
        ])
      );
      expect(response.status).toEqual(200);
    });
  });

  // postClient
  describe('POST Client', () => {
    // the test setup;
    beforeEach(() => {
      const interaction = {
        state: 'i create a new client',
        uponReceiving: 'a request to create client with firstname and lastname',
        withRequest: {
          method: 'POST',
          path: '/clients',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: postUserBody,
        },
        willRespondWith: {
          status: 200,
          body: like(postUserExpectedBody),
        },
      };

      return provider.addInteraction(interaction);
    });

    // the test
    test('returns correct body, header and statusCode', async () => {
      const response = await postClient(postUserBody);
      expect(response.status).toEqual(200);
      expect(response.data.id).toEqual(expect.any(Number));
    });
  });
});
