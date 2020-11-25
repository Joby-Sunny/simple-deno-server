export function parseQueryParams(
  queryParamString: string
): { [key: string]: any } {
  let searchParams: URLSearchParams = new URLSearchParams(queryParamString);
  let response: { [key: string]: any } = {};
  for (let key of searchParams.keys()) {
    response[key] = searchParams.get(key);
  }
  return response;
}
