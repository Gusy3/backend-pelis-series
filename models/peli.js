'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var PeliSchema= Schema({
    title: String,
    gender: String,
    year: Number,
    resolution: String,
    codec: String,
    size: Number,
    synopsis: String,
    image: String,
    viewed: String,
    created_at: {type: Date, default: Date.now}
}, {
    versionKey: false
});

export default mongoose.model('Pelis', PeliSchema);