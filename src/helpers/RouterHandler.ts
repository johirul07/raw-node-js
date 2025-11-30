import { IncomingMessage, ServerResponse } from "http";


type RouterHandler = (req: IncomingMessage, res:ServerResponse) => void;

export default RouterHandler