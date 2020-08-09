'use strict';


/**
 * Basic profile Information
 * Basic profile Information
 *
 * returns inline_response_200
 **/ 
// Commented below code for reference. This is server generated example API response
// exports.getBasics = function() {
//   return new Promise(function(resolve, reject) {
//     var examples = {};
//     examples['application/json'] = {
//   "basics" : {
//     "website" : "website",
//     "phone" : "phone",
//     "name" : "name",
//     "id" : "id",
//     "label" : "label",
//     "picture" : "picture",
//     "email" : "email"
//   },
//   "profiles" : [ {
//     "id" : "id",
//     "url" : "url",
//     "network" : "network",
//     "username" : "username"
//   }, {
//     "id" : "id",
//     "url" : "url",
//     "network" : "network",
//     "username" : "username"
//   } ],
//   "location" : {
//     "address" : "address",
//     "city" : "city",
//     "postcalCode" : 0.8008281904610115,
//     "countryCode" : "countryCode",
//     "id" : "id",
//     "region" : "region"
//   }
// };
//     if (Object.keys(examples).length > 0) {
//       resolve(examples[Object.keys(examples)[0]]);
//     } else {
//       resolve();
//     }
//   });
// }

const Responses = require('../utils/API_Responses');
const Dynamo = require('../utils/dynamo');

const tableName = process.env.DYNAMODB_TABLE_BASIC;

exports.getBasics = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!user) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user });
};