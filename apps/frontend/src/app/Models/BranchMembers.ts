import IBaseMongoInterface from './BaseInterface';
import { IBranchOffice } from './BranchOffice';
import IWithTotalCount from './WithTotalCount';

export interface IBranchMembers extends IBaseMongoInterface {
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  branch: IBranchOffice;
}

export type IBranchMembersWithTotalCount = IWithTotalCount<IBranchMembers>;
