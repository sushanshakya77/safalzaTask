import { Router } from 'express';
import {
  createBranchOffice,
  deleteBranchOffice,
  getAllBranchOffice,
  updateBranchOffice,
} from '../controller/BranchOffice';

const router = Router();

router.post('/create', createBranchOffice);
router.get('/get', getAllBranchOffice);
router.delete('/delete/:id', deleteBranchOffice);
router.patch('/update/:id', updateBranchOffice);

export default router;
