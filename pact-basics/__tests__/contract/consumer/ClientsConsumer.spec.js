'use strict';

const { Matchers } = require('@pact-foundation/pact');
const { getClients, postClient } = require('../../../src/consumer/consumer');

describe('Clients Service', () => {
  const GET_EXPECTED_BODY = [
    {
      firstName: 'Lisa',
      lastName: 'Simpson',
      dateOfBirth: Matchers.term(
        generate: "01/01/2005",
        matcher: /\d{2}\/\d{2}\/\d{4}/,
      ),
      age: 20,
      id: 1,
    },
    {
      firstName: 'Wonder',
      lastName: 'Woman',
      dateOfBirth: "01/01/1990",
      age: Matchers.like(35),
      id: 2,
    },
    {
      firstName: 'Homer',
      lastName: 'Simpson',
      dateOfBirth:"01/01/1980",
      age: 45,
      id: 3,
    },
  ];

  afterEach(() => provider.verify());

  describe('GET Clients', () => {
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
          body: GET_EXPECTED_BODY,
        },
      };

      return provider.addInteraction(interaction);
    });

    test('returns correct body, header and statusCode', async () => {
      const response = await getClients();
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(GET_EXPECTED_BODY);
      expect(response.status).toEqual(200);
    });
  });

  const POST_BODY = {
    firstName: 'Rafaela',
    lastName: 'Azevedo',
    age: 29,
  };

  const POST_EXPECTED_BODY = {
    firstName: 'Rafaela',
    lastName: 'Azevedo',
    age: 29,
    id: 3,
  };

  describe('POST Client', () => {
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
          body: POST_BODY,
        },
        willRespondWith: {
          status: 200,
          body: Matchers.like(POST_EXPECTED_BODY).contents,
        },
      };

      return provider.addInteraction(interaction);
    });

    test('returns correct body, header and statusCode', async () => {
      const response = await postClient(POST_BODY);
      // expect(response.data.id).toEqual(3);
      expect(response.status).toEqual(200);
    });
  });
});
