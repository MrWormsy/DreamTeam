// Accounts' Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = new Schema (
{
	username : String,
	password : String,
	createdAt : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Account',AccountSchema);