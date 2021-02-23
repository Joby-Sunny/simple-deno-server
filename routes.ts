import { Router } from "https://deno.land/x/oak/mod.ts";
import { Controller } from "./controller.ts";
import { GlossaryItem } from "./interfaces.ts";
import { parseQueryParams } from "./Utilities.ts";

const FILE_PATH: string = "./Glossary.json";
const jsonDataString: string = await Deno.readTextFile(FILE_PATH);

function fetchDataJson(): Array<GlossaryItem> {
  const jsonData: Array<GlossaryItem> = JSON.parse(jsonDataString);
  return jsonData;
}

export class Routes {
  private router: Router;
  private controller: Controller;

  public constructor() {
    this.router = new Router();
    this.controller = new Controller(fetchDataJson());
    this.attachRoutes();
  }

  public attachRoutes() {
    this.router
      .get("/glossary", this.getGlossaryList.bind(this))
      .get("/glossary/all", this.getAllGlossaryItems.bind(this))
      .get("/glossary/:contentId", this.getGlossaryItem.bind(this));
  }

  public getGlossaryList({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) {
    const parsedQueryParams = parseQueryParams(request.url.search.substr(1));
    const parsedGlossaryListParams = this.controller.parseGlossaryListParams(
      parsedQueryParams
    );
    const glossaryList = this.controller.getGlossaryList(
      parsedGlossaryListParams
    );
    const glossaryListSorted = this.controller.sortGlossaryList(glossaryList);
    response.body = glossaryListSorted;
  }

  public getGlossaryItem({ params, response }: { params: any; response: any }) {
    let parsedGetGlossaryItemParams = this.controller.parseGetGlossaryItemParam(
      params
    );
    response.body = this.controller.getGlossaryItem(
      parsedGetGlossaryItemParams
    );
  }

  public getAllGlossaryItems({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) {
    const parsedQueryParams = parseQueryParams(request.url.search.substr(1));
    const parsedGlossaryListParams = this.controller.parseGlossaryListParams(
      parsedQueryParams
    );

    const glossaryList = this.controller.getAllGlossaryItems(
      parsedGlossaryListParams
    );

    response.body = this.controller.sortGlossaryList(glossaryList);
  }

  public getRouter() {
    return this.router;
  }
}
