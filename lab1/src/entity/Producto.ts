import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany, ManyToOne } from "typeorm"
import { Detalle_Factura } from "./Detalle_Factura"
import { Proveedor } from "./Proveedor"
@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    Codigo_producto: number

    @Column({length: 50})
    Nombre: string

    @Column()
    Precio_producto: number

    @Column()
    Stock_maximo_producto: number

    @Column()
    Stock_minimo_producto: number

    @ManyToOne(() => Proveedor, (Proveedor) => Proveedor.Codigo_proveedor)
    Codigo_proveedor: Proveedor

    @OneToMany(() => Detalle_Factura, (Detalle_Factura) => Detalle_Factura.Numero)
    producto:Detalle_Factura[]
}