import { Router } from "express"
import proveedorcontroller from "../controller/proveedorcontroller"

const routes = Router();

routes.get('', proveedorcontroller.getAll);
routes.get('/:id', proveedorcontroller.getById);
routes.post('', proveedorcontroller.add);
routes.put('', proveedorcontroller.update);

export default routes;