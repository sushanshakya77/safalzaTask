export as namespace Express;
export = Express;

declare namespace Express {
  interface Request {
    pagination: Record<'pageSize' | 'pageNumber', number>;
  }
}
