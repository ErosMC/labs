import { Router } from "express"
import Facturacontroller from "../controller/Facturacontroller"

const routes = Router();

routes.get('', Facturacontroller.getAll);
routes.get('/:id', Facturacontroller.getById);
routes.post('', Facturacontroller.add);
routes.put('', Facturacontroller.update);
routes.delete('', Facturacontroller.delete);

export default routes;