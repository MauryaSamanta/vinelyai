import express from 'express';
import { addMember, createGroup, getUserGroups } from '../controllers/groups.js';

const router = express.Router();

router.post("/getgroups", getUserGroups);
router.post('/create', createGroup);
router.post('/addmember', addMember);
export default router;
