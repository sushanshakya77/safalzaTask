import { RequestHandler } from 'express';

export const pagination: RequestHandler = (req, _, next) => {
  const { pageNumber, pageSize } = req.query;

  req.pagination = {
    pageNumber: +(pageNumber ?? 0),
    pageSize: +(pageSize ?? 25),
  };
  return next();
};
