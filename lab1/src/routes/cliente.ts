import { Router } from "express"
import clientecontroller from "../controller/clientecontroller"

const routes = Router();

routes.get('', clientecontroller.getAll);
routes.get('/:id', clientecontroller.getById);
routes.post('', clientecontroller.add);
routes.put('', clientecontroller.update);
routes.delete('', clientecontroller.delete);
export default routes;