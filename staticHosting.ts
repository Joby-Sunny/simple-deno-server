import { Context, send } from "https://deno.land/x/oak/mod.ts";
import { doesFileExist } from "./Utilities.ts";

const HOSTING_BASE_PATH = `${Deno.cwd()}/public`;

export async function staticHosting(context: Context, next: Function) {
  try {
    const { request } = context;
    const filePath = `${HOSTING_BASE_PATH}${request.url.pathname}`;
    const fileExist = await doesFileExist(filePath);
    if (fileExist) {
      await send(context, context.request.url.pathname, {
        root: HOSTING_BASE_PATH,
      });
    } else await next();
  } catch (error) {
    console.log("Error at hostImages", error);
  }
}
