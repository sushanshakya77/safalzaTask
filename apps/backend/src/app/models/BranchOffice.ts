import { model, Schema } from 'mongoose';
import { IWithTotalCount } from './BranchMembers';

export interface IBranchOffice {
  branchName: string;
  branchEmail: string;
  branchPhone: string;
  branchLocation: string;
  branchManager: string;
  users: number;
}

export type IBranchOfficeWithTotalCount = IWithTotalCount<IBranchOffice>;

const BranchOfficeSchema = new Schema(
  {
    branchName: {
      type: String,
    },
    branchEmail: {
      type: String,
    },
    branchPhone: {
      type: String,
    },
    branchLocation: {
      type: String,
    },
    branchManager: {
      type: String,
    },
    users: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const BranchOffice = model('BranchOffice', BranchOfficeSchema);

export default BranchOffice;
