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

export async function doesFileExist(filePath: string) {
  try {
    const fileStatus = await Deno.lstat(filePath);
    return fileStatus && fileStatus.isFile;
  } catch (error) {
    if (error && error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}
