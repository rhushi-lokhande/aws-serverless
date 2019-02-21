'use strict';
const helper = require('./lib/helper');

module.exports.create =  (event, context, callback) => {
	helper.createData(event,callback);
};


module.exports.getSaleData =  (event, context, callback) => {
	helper.getSaleData(event,callback);
};
  

