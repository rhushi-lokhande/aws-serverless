const FR = require('./response').fromResponse;
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = 'locusnineSaleDev'
module.exports.getSaleData = (e,cb)=>{
    const param ={
        TableName: tableName
    }
    dynamoDb.scan(param,(error,result)=>{
        if(error){
            cb(error);
            return;
        }
        cb(null,FR(200,result));
        return;
    })
}

module.exports.createData = (e,cb)=>{
    const param ={
		TableName: tableName,
		Item:{
			id:new Date().getTime(),
			text:'this is the dummy entry after end',
			checked:false
		}
	}
	dynamoDb.put(param,(error,result)=>{
		if(error){
			cb(error);
			return;
		}
        cb(null,FR(200,param));
        return;
	})

}