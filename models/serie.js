'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var SerieSchema= Schema({
    title: String,
    gender: [String],
    year: Number,
    synopsis: String,
    image: String,
    viewed: String,
    category: String,
    created_at: {type: Date, default: Date.now}
}, {
    versionKey: false
});

export default mongoose.model('Serie', SerieSchema);