import { Router } from "express";
import factura from "./factura";
import cliente from "./cliente";
import producto from "./producto";
import proveedor from "./proveedor";
import vendedor from "./vendedor";
import { checkjwt } from "../middleware/jwt";
const routes = Router();

routes.use("/factura", factura);
routes.use("/cliente", cliente);
routes.use("/producto", producto);
routes.use("/proveedor", proveedor);
routes.use("/vendedor", vendedor);

export default routes;
