import { Entity, PrimaryGeneratedColumn, Column, IntegerType, ManyToOne, OneToMany } from "typeorm"
import { Cliente } from "./Cliente"
import { Vendedor } from "./Vendedor"
import { Detalle_Factura } from "./Detalle_Factura"

@Entity()
export class Cabezera_Factura {

    @PrimaryGeneratedColumn()
    Numero: number

    @ManyToOne(() => Cliente, (Cliente) => Cliente.Ruc_Cliente)
    Ruc_cliente: Cliente[]

    @ManyToOne(() => Vendedor, (Vendedor) => Vendedor.Codigo_Vendedor)
    Codigo_vendedor: Vendedor[]

    @Column()
    fecha: Date 

    @Column()
    Estado: boolean
    
    @OneToMany(() => Detalle_Factura, (Detalle_Factura) => Detalle_Factura.Numero)
    producto:Detalle_Factura[]
}