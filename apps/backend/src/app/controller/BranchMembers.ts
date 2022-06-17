import * as express from 'express';
import { RequestHandler } from 'express';
import { FilterQuery, SortOrder } from 'mongoose';
import { pagination } from '../middleware/pagination';
import BranchMembers from '../models/BranchMembers';
import { IBranchMembers } from './../models/BranchMembers';

export const createBranchMembers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log(req.body);
    // if (req.body.branch === '') {
    //   req.body.branch = undefined;
    // }
    const branchMembers = new BranchMembers(req.body);
    const savedMembers = await branchMembers.save();
    return res.status(200).send(savedMembers);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const getBranchMembers: RequestHandler | RequestHandler[] = [
  pagination,
  async (req: express.Request, res: express.Response) => {
    try {
      const { pageNumber, pageSize } = req.pagination;
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;
      let query: FilterQuery<IBranchMembers> = {};
      const searchTitle = req.query.searchTitle;

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
      if (searchTitle) {
        query = {
          $or: [
            // { 'branch.branchName': { $regex: searchTitle, $options: 'i' } },
            // { 'branch.branchLocation': { $regex: searchTitle, $options: 'i' } },
            { memberName: { $regex: searchTitle, $options: 'i' } },
          ],
        };
      }

      const branchNameOrder = req.query.branchNameOrder;
      const nameOrder = req.query.nameOrder;

      const total = await BranchMembers.countDocuments(query);

      const data = await BranchMembers.find(query)
        .populate('branch', '_id branchName branchLocation')
        .skip(startIndex)
        .limit(pageSize)
        .sort({
          // 'branch.branchName': branchNameOrder as SortOrder,
          // createdAt: -1,
          memberName: nameOrder as SortOrder,
        });

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

export const deleteBranchMembers: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const branchMembers = await BranchMembers.findByIdAndDelete(req.params.id);
    return res.status(200).send(branchMembers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//update branch members
export const updateBranchMembers: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const branchMembers = await BranchMembers.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).send(branchMembers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//get all branch members
export const getAllBranchMembers: RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const branchMembers = await BranchMembers.find();
    return res.status(200).send(branchMembers);
  } catch (error) {
    return res.status(500).send(error);
  }
};
