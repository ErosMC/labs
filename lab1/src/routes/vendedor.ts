import { Router } from "express"
import vendedorcontroller from "../controller/vendedorcontroller"

const routes = Router();

routes.get('', vendedorcontroller.getAll);
routes.get('/:id', vendedorcontroller.getById);
routes.post('', vendedorcontroller.add);
routes.put('', vendedorcontroller.update);


export default routes;