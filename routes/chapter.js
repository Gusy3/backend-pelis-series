'use strict'

import express from "express";
import ChapterController from "../controllers/chapter.js";
import verifyToken from "../middleware/verify-token.js";

var chaper_router = express.Router();

chaper_router.post('/season/:id/save-chapter', verifyToken, ChapterController.save);
chaper_router.get('/season/:id/chapters', verifyToken, ChapterController.getChapters);
chaper_router.get('/chapter/:id', verifyToken, ChapterController.getChapter);
chaper_router.put('/chapter/:id', verifyToken, ChapterController.update);
chaper_router.delete('/chapter/:id', verifyToken, ChapterController.delete);

 export default chaper_router;