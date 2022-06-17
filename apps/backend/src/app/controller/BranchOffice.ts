import { IBranchOffice } from './../models/BranchOffice';

import BranchOffice from '../models/BranchOffice';
import * as express from 'express';
import { FilterQuery, SortOrder } from 'mongoose';
import BranchMembers from '../models/BranchMembers';
import { pagination } from '../middleware/pagination';

interface BranchOfficeInterface {
  total: number;
  data: IBranchOffice[];
  pageNumber: number;
}

//get all branch office with pagination and search
export const getAllBranchOffice:
  | express.RequestHandler
  | express.RequestHandler[] = [
  pagination,
  async (req: express.Request, res: express.Response) => {
    try {
      const { pageNumber, pageSize } = req.pagination;
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;
      let query: FilterQuery<IBranchOffice> = {};
      const searchTitle = req.query.searchTitle;
      if (searchTitle) {
        query = {
          $or: [
            { branchName: { $regex: searchTitle, $options: 'i' } },
            { branchLocation: { $regex: searchTitle, $options: 'i' } },
          ],
        };
      }
      const results: { next: any; previous: any } = {
        next: undefined,
        previous: undefined,
      };

      if (endIndex < (await BranchMembers.countDocuments().exec())) {
        results.next = {
          pageNumber: pageNumber + 1,
          pageSize: pageSize,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
        };
      }
      const order = req.query.order;

      const total = await BranchOffice.countDocuments(query);
      const data = await BranchOffice.find(query)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ branchName: order as SortOrder });

      const result = {
        total,
        startIndex,
        endIndex,
        results,
        data,
      };
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
];

export async function createBranchOffice(
  req: express.Request,
  res: express.Response
) {
  try {
    const branchOffice = new BranchOffice(req.body);
    await branchOffice.save();
    return res.status(200).send(branchOffice);
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function updateBranchOffice(
  req: express.Request,
  res: express.Response
) {
  try {
    const branchOffice = await BranchOffice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!branchOffice) {
      return res.status(404).send('BranchOffice not found');
    }
    return res.status(200).send(branchOffice);
  } catch (err) {
    return res.status(500).send(err);
  }
}
export async function deleteBranchOffice(
  req: express.Request,
  res: express.Response
) {
  try {
    const branchInMember = await BranchMembers.findOne({
      branch: req.params.id,
    });

    if (branchInMember) {
      return res.status(400).send('BranchOffice has members');
    } else {
      const branchOffice = await BranchOffice.findByIdAndDelete(req.params.id);
      if (!branchOffice) {
        return res.status(404).send('BranchOffice not found');
      }
      return res.status(200).send(branchOffice);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

// Language: typescript
// Path: apps\backend\src\app\controller\BranchOffice.ts
