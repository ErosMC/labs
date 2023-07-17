import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany } from "typeorm"
import { Producto } from "./Producto"
@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    Codigo_proveedor: number

    @Column({ length: 50 })
    Nombres_Proveedor: string

    @Column({ length: 60 })
    Apellidos_Proveedor: string

    @Column({ length: 500 })
    Direccion_Proveedor: string

    @Column({ length: 20 })
    Provincia_Proveedor: string

    @Column({ length: 15 })
    Telefono_Proveedor: string

    @OneToMany(() => Producto, (Producto) => Producto.Codigo_producto)
    producto:Producto[]
}
