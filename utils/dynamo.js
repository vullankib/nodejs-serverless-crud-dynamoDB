const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(id, TableName) {
        const params = {
            TableName,
            Key: {
                id,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },

    async write(data, TableName) {
        // if (!data.id) {
        //     throw Error('no ID on the data');
        // }

        const params = {
            TableName,
            Item: data,
        };
        console.log('params',params);
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`);
        }

        return data;
    },
};
module.exports = Dynamo;