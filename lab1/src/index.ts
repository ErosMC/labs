import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Cliente } from "./entity/Cliente"
import { Vendedor } from "./entity/Vendedor"
import { Proveedor } from "./entity/Proveedor"
import { Producto } from "./entity/Producto"
import { Cabezera_Factura } from "./entity/Cabezera_Factura"
import { Detalle_Factura } from "./entity/Detalle_Factura"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    

    // setup express app here
    // ...

    // start express server
    app.listen(3000)



    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
