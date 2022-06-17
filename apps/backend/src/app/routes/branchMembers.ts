import {
  getAllBranchMembers,
  updateBranchMembers,
} from './../controller/BranchMembers';
import { Router } from 'express';
import {
  createBranchMembers,
  deleteBranchMembers,
  getBranchMembers,
} from '../controller/BranchMembers';

const router = Router();

router.post('/create', createBranchMembers);
router.get('/get', getBranchMembers);
router.get('/getAll', getAllBranchMembers);
router.delete('/delete/:id', deleteBranchMembers);
router.patch('/update/:id', updateBranchMembers);

export default router;
