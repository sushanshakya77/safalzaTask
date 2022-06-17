import { Router } from 'express';
import BranchMembers from './branchMembers';
import BranchOffice from './branchOffice';

const router = Router();

router.use('/branchMembers', BranchMembers);
router.use('/branchOffice', BranchOffice);

export default router;
