module.exports.fromResponse = (status, data) => {
    return response = {
        statusCode: status,
        body: JSON.stringify(data),
        isBase64Encoded: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }
}