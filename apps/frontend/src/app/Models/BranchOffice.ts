// import { IBranchMembers } from './BranchMembers';

import IBaseMongoInterface from './BaseInterface';
import IWithTotalCount from './WithTotalCount';

export interface IBranchOffice extends IBaseMongoInterface {
  branchName: string;
  branchEmail: string;
  branchPhone: string;
  branchLocation: string;
  branchManager: string;
  users: number;
}

export type IBranchOfficeWithTotalCount = IWithTotalCount<IBranchOffice>;
