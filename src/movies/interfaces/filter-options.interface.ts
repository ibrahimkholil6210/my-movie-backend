export default interface IFilterOptions {
  search?: string;
  offset?: number;
  limit?: number;
  sortBy?: SortBy;
  sortDirection?: number;
}

export enum SortBy {
  TITLE = 'title',
  CREATEDAT = 'createdAt',
}
