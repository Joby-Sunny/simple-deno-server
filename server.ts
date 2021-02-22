import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Routes } from "./routes.ts";
import { staticHosting } from "./staticHosting.ts";

const HOST: String = "127.0.0.1";
const PORT: Number = 8008;

class Server {
  private port: Number = 0;
  private host: String = "";
  private app: Application;
  private routes: Routes;

  constructor(port: Number, host: String) {
    this.port = port;
    this.host = host;
    this.app = new Application();
    this.routes = new Routes();
  }

  attachMiddlewares() {
    let router = this.routes.getRouter();
    this.app.use(oakCors());
    this.app.use(staticHosting);
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async startServer() {
    this.attachMiddlewares();
    const serverAddress = `${this.host}:${this.port}`;
    console.log(`Server up and running:\n ${serverAddress}`);
    await this.app.listen(`${serverAddress}`);
  }
}

let server = new Server(PORT, HOST);
await server.startServer();
