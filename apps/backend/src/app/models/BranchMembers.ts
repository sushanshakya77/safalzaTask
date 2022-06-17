import { model, Schema } from 'mongoose';
import { IBranchOffice } from './BranchOffice';

export interface IWithTotalCount<T = unknown> {
  total: number;
  data: T[];
}

export interface IBranchMembers {
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  branch: IBranchOffice;
}

export type IBranchMembersWithTotalCount = IWithTotalCount<IBranchMembers>;

const BranchMembersSchema = new Schema(
  {
    memberName: {
      type: String,
    },
    memberEmail: {
      type: String,
    },
    memberPhone: {
      type: String,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: 'BranchOffice',
    },
  },
  { timestamps: true }
);

export const BranchMembers = model('BranchMembers', BranchMembersSchema);

export default BranchMembers;
