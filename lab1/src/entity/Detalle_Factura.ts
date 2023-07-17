import { Entity, PrimaryGeneratedColumn, Column, IntegerType, ManyToOne } from "typeorm"
import { Cabezera_Factura } from "./Cabezera_Factura"
import { Producto } from "./Producto"

@Entity()
export class Detalle_Factura {

    @PrimaryGeneratedColumn()
        @ManyToOne(() => Cabezera_Factura, (Cabezera_Factura) => Cabezera_Factura.Numero)
        Numero:Cabezera_Factura

        @ManyToOne(() => Producto, (Producto) => Producto.Codigo_producto)
        Codigo_Producto:Producto

    @Column()
    Cantidad: number
   
}