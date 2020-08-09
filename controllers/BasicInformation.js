'use strict';
const uuid = require('uuid');
const Responses = require('../utils/API_Responses');
const Dynamo = require('../utils/dynamo');

const tableName = process.env.DYNAMODB_TABLE_BASIC;

exports.getBasics = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.id) {
        // failed without an ID
        return Responses._400({ message: 'Missing the ID from the path' });
    }

    let id = event.pathParameters.id;

    const user = await Dynamo.get(id, tableName).catch(err => {
        console.log('Error in Dynamo Get', err);
        return null;
    });

    if (!user) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user });
};

exports.createBasics = async event => {
  console.log('event', event);

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }
  const params = {
      id: uuid.v1(),
      name: data.name,
      createdAt: timestamp,
  };
  // console.log('params',params);

const user = await Dynamo.write(params, tableName).catch(err => {
        console.log('Error in Dynamo Write', err);
        return null;
    });


  if (!user) {
      return Responses._400({ message: 'Failed to Write user data' });
  }

  return Responses._200({ user });
};