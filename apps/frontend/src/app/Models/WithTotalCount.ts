export default interface IWithTotalCount<T = unknown> {
  total: number;
  data: T[];
  startIndex: number;
  endIndex: number;
  results: unknown;
}
