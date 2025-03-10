'use strict';

const { Matchers } = require('@pact-foundation/pact');
const { getClients, postClient } = require('../../../src/consumer/consumer');

const getUsersExpectedBody = [
  {
    firstName: 'Lisa',
    lastName: 'Simpson',
    dateOfBirth: '01/01/2005',
    age: 20,
    id: 1,
  },
  {
    firstName: 'Wonder',
    lastName: 'Woman',
    dateOfBirth: '01/01/1990',
    age: 35,
    id: 2,
  },
  {
    firstName: 'Homer',
    lastName: 'Simpson',
    dateOfBirth: '01/01/1980',
    age: 45,
    id: 3,
  },
];

const postUserBody = {
  firstName: 'Rafaela_REQUEST',
  lastName: 'Azevedo_REQUEST',
  age: 29,
};

const postUserExpectedBody = {
  firstName: Matchers.string('Rafaela_RESPONSE'),
  lastName: Matchers.string('Azevedo_RESPONSE'),
  age: Matchers.integer(29),
  id: Matchers.integer(4),
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
          body: getUsersExpectedBody,
        },
      };

      return provider.addInteraction(interaction);
    });

    // the test
    test('returns correct body, header and statusCode', async () => {
      const response = await getClients();
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(getUsersExpectedBody);
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
          body: Matchers.like(postUserExpectedBody).contents,
        },
      };

      return provider.addInteraction(interaction);
    });

    // the test
    test('returns correct body, header and statusCode', async () => {
      const response = await postClient(postUserBody);
      expect(response.data.id).toEqual(4);
      expect(response.status).toEqual(200);
    });
  });
});
