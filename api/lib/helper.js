const FR = require('./response').fromResponse;
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = 'locusnineSaleDev'
module.exports.getSaleData = (e, cb) => {
    let ExpressionAttributeValues = {
        ":to": parseInt(e.queryStringParameters.to),
        ":from": parseInt(e.queryStringParameters.from),
    }
    let FilterExpression = "#id > :from and #id < :to " + (e.queryStringParameters.reps ? "and Rep = :rep" : "");
    if (e.queryStringParameters.reps && e.queryStringParameters.reps.length) {
        ExpressionAttributeValues[":rep"] = e.queryStringParameters.reps;
    }
    const param = {
        TableName: tableName,
        IndexName: "id-index",
        FilterExpression: FilterExpression,
        ExpressionAttributeNames: {
            "#id": "id",
        },
        ExpressionAttributeValues: ExpressionAttributeValues,
        ScanIndexForward: true
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
module.exports.getReps = (e, cb) => {
    const param = {
        TableName: 'locusnineRepsDev',
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

module.exports.getLeftPanelData = (e, cb)=>{

    let dir = e.queryStringParameters.dir|| 'Top';
    let ExpressionAttributeValues = {
        ":to": parseInt(e.queryStringParameters.to),
        ":from": parseInt(e.queryStringParameters.from),
    }
    let FilterExpression = "#id > :from and #id < :to ";

    const param = {
        TableName: tableName,
        IndexName: "id-index",
        FilterExpression: FilterExpression,
        ExpressionAttributeNames: {
            "#id": "id",
        },
        ExpressionAttributeValues: ExpressionAttributeValues,
        ScanIndexForward: true
    }
    dynamoDb.scan(param, (error, result) => {
        if (error) {
            cb(error);
            return;
        }

        data = result;
        data.rep = {};
        data.Items.map(d => {
			if (!data.rep[d.Rep]) {
				data.rep[d.Rep] = {
					newMMR: 0,
					newLogos: 0,
					demoCalls: 0
				};
			}

			data.rep[d.Rep].newMMR += d.MMR;
			data.rep[d.Rep].newLogos += d.Logo;
			if (d.status === 'Contact Made') {
				data.rep[d.Rep].demoCalls++;
				data.call++;
			}
        })

        let reps = Object.keys(data.rep);
        let leftCardDetails=[];
		reps.sort((a, b) => {
			if (data.rep[a].newMMR < data.rep[b].newMMR)
				return 1;
			if (data.rep[a].newMMR > data.rep[b].newMMR)
				return -1;
			return 0;
		});
		if (dir === 'Top') {
			reps.slice(0, 3).map(r => {
				let d = data.rep[r];
				d.name = r;
				leftCardDetails.push(d)
			})
		} else {
			reps.reverse().slice(0, 3).map(r => {
				let d = data.rep[r];
				d.name = r;
				leftCardDetails.push(d)
			})
		}
        cb(null, FR(200, {data:leftCardDetails}));
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