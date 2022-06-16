/**
 * Get object and make it to query-params string
 * @param obj 
 * @returns string - like key=val&ke2=val2
 */
function toQueryParams(obj: Record<string, any>) {
  const str = Array<String>();
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + 
      encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


export {
  toQueryParams
}