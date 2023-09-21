'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ChapterSchema= Schema({
    title: String,
    resolution: String,
    codec: String,
    size: Number,
    viewed: String,
    id_season: String
}, {
    versionKey: false
});

export default mongoose.model('Chapter', ChapterSchema);