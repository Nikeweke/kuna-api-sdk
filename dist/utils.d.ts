/**
 * Get object and make it to query-params string
 * @param obj
 * @returns string - like key=val&ke2=val2
 */
declare function toQueryParams(obj: Record<string, any>): string;
export { toQueryParams };
