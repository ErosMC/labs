import "reflect-metadata"
import { DataSource } from "typeorm"
import { cliente } from "./entity/Cliente"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234T",
    database: "dblab1",
    synchronize: true,
    logging: false,
    entities: [cliente],
    migrations: [],
    subscribers: [],
})
