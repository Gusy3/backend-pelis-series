'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var UserSchema= Schema({
    username: String,
    password: String,
}, {
    versionKey: false
});

export default mongoose.model('User', UserSchema);