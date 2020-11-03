import { Router } from "https://deno.land/x/oak/mod.ts";

export class Routes {
  private router: Router;

  public constructor() {
    this.router = new Router();
    this.attachRoutes();
  }

  public attachRoutes() {
    this.router
      .get("/glossary", getGlossary)
      .get("/glossary/:contentId", getDescription);
  }

  public getRouter() {
    return this.router;
  }
}

function getGlossary({ response }: { response: any }) {
  console.log("getGlossay route is hit");
  response.body = { message: "hello world" };
}

function getDescription({
  params,
  response,
}: {
  params: { contentId: string };
  response: any;
}) {
  console.log("contentId is", params.contentId);
  response.body = {
    image:
      "https://content.labxchange.org/labs/2.1-verify-snp-sequence/images/input_output.svg",
    title: "Lopem Ipsum",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  };
}
