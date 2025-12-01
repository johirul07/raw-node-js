import { ServerResponse } from "http";

function sendJson(res: ServerResponse, stateCode: number, data: any) {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

export default sendJson;
