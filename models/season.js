'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var SeasonSchema= Schema({
    title: String,
    viewed: String,
    id_serie: String
}, {
    versionKey: false
});

export default mongoose.model('Season', SeasonSchema);