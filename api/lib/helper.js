const FR = require('./response').fromResponse;
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = 'locusnineSaleDev'
module.exports.getSaleData = (e, cb) => {
    const param = {
        TableName: tableName,
        FilterExpression: "#id > :from and #id < :to",
        ExpressionAttributeNames: {
            "#id": "id",
        },
        ExpressionAttributeValues: {
             ":to": parseInt(e.queryStringParameters.to),
             ":from": parseInt(e.queryStringParameters.from)
        }
    }
    dynamoDb.scan(param, (error, result) => {
        if (error) {
            cb(error);
            return;
        }
        cb(null, FR(200, result));
        return;
    })
}
function getRandomizer(bottom, top) {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}
module.exports.createData = (e, cb) => {
    var reps = ['John Doe', 'Tom Robert', 'Juilia Cruise', 'Ethan Hunt', 'Micheal Faleti'];
    var client = ['Google', 'Microsoft', 'Adobe', 'Locusnine', 'Accenture', 'Apple', 'Samsung'];
    var person = ['Rafael Mafael', 'Marilyn White', 'Lily Wilson', 'Zillah Jacobi', 'Filippa Christensen', 'Ava Burke', 'Viivi lammi', 'Jeff Collins'];
    var vertical = ['Marketing', 'Sale', 'Sr. Management', 'Technology'];
    var meeting_location = ['Call', 'Face to face', 'Video'];
    var status1 = ['Lead In', 'Contact Made', 'Need Defined', 'Proposal Made', 'Negotiation Started', 'Won', 'Lost'];
    var count = 10;
    for (var i = 0; i <= count; i++) {
        const param = {
            TableName: tableName,
            Item: {
                id: getRandomizer(1550169000000, 1551465000000),
                Rep: reps[getRandomizer(1, 5) - 1],
                client: client[getRandomizer(1, 7) - 1],
                contact_person: person[getRandomizer(1, 8) - 1],
                vertical: vertical[getRandomizer(1, 4) - 1],
                meeting_location: meeting_location[getRandomizer(1, 3) - 1],
                status: status1[getRandomizer(1, 7) - 1],
                MMR: getRandomizer(100, 500),
                DemoCall: getRandomizer(1, 5),
                Logo: getRandomizer(1, 5),
            }
        }
        dynamoDb.put(param, (error, result) => {
            if (error) {
                cb(error);
                return;
            }
            if (i == count) {
                cb(null, FR(200, param));
                return;
            }
        })
    }

}