import { Router } from "express"
import productocontroller from "../controller/productocontroller"

const routes = Router();

routes.get('', productocontroller.getAll);
routes.get('/:id', productocontroller.getById);
routes.post('', productocontroller.add);
routes.put('', productocontroller.update);

export default routes;