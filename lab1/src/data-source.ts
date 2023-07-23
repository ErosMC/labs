import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cliente } from "./entity/Cliente"
import { Cabezera_Factura } from "./entity/Cabezera_Factura"
import { Detalle_Factura } from "./entity/Detalle_Factura"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234T",
    database: "dblab1",
    synchronize: true,
    logging: false,
    entities: [Cliente,Cabezera_Factura,Detalle_Factura,Producto,Proveedor,Vendedor],
    migrations: [],
    subscribers: [],
})
