import { createRouter } from "../../lib/create-app";

import * as statusFlowRoutes from "./status-flow.routes";
import * as statusFlowHandler from "./status-flow.handler";

const router = createRouter()
  .openapi(statusFlowRoutes.getStatusFlows, statusFlowHandler.getStatusFlows)
  .openapi(statusFlowRoutes.deleteStatusFlow, statusFlowHandler.deleteStatusFlow)
  .openapi(statusFlowRoutes.saveStatusFlows, statusFlowHandler.saveStatusFlows);

export default router;
