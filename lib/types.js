var CustomType = require('xmlrpc').CustomType;
var util = require('util');

var types = module.exports = {};

//double
types.Double = function (raw, significance) {
	raw = (typeof(raw) === 'number') ? raw : parseFloat(raw, 10);
	this.significance = significance;
	CustomType.call(this, raw);
};

util.inherits(types.Double, CustomType);
types.Double.prototype.serialize = function (xml) {
	var value = this.significance ? this.raw.toFixed(this.significance) : this.raw.toString();
	xml.ele('double').txt(value);
};

// integer
types.Integer = function (raw) {
	raw = (typeof(raw) === 'number') ? raw : parseInt(raw, 10);
	CustomType.call(this, raw);
};

util.inherits(types.Integer, CustomType);
types.Integer.prototype.tagName = 'int';

// date (iso8601)
// eg: using Moment JS date lib:
// var datetime = moment().format('YYYYMMDD\THH:mm:ss');
types.Date = function (raw) {
    CustomType.call(this, raw);
};

util.inherits(types.Date, CustomType);
types.Date.prototype.serialize = function (xml) {
    var value = this.raw.toString();
    xml.ele('dateTime.iso8601').txt(value);
};