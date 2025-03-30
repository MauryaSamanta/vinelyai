import express from 'express';
import {   deleteAllConnections, getmessages, search, uploadLinkedInConnections } from '../controllers/connections.js';
import { attachmentsMulter } from '../middleware/multer.js';
//import { processConnectionEmbeddings } from '../testscripts/processconnection.js';

const router = express.Router();

// Route for user signup
router.post('/upload',attachmentsMulter, uploadLinkedInConnections);
router.post('/search',search);
router.post('/getmsg',getmessages);

router.delete('/delete', deleteAllConnections);
//router.post('/enrichdata',processConnectionEmbeddings );
export default router;
