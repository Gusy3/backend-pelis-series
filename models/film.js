'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var FilmSchema= Schema({
    title: String,
    version: String,
    gender: [String],
    year: Number,
    resolution: String,
    codec: String,
    size: Number,
    synopsis: String,
    image: String,
    viewed: String,
    category: String,
    created_at: {type: Date, default: Date.now}
}, {
    versionKey: false
});

export default mongoose.model('Film', FilmSchema);