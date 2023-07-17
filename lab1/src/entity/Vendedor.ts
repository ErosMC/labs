import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany } from "typeorm"
import { Cabezera_Factura } from "./Cabezera_Factura"
@Entity()
export class Vendedor{

    @PrimaryGeneratedColumn()  
    Codigo_Vendedor: number

    @Column({ length: 50 })
    Nombres_Vendedor: string

    @Column({ length: 60 })
    Apellidos_Vendedor: string

    @Column({ length: 500 })
    Direccion_Vendedor: string

    @Column({ length: 15 })
    Telefono_Vendedor: string

    @Column({ length: 11 })
    Celular_Vendedor: string

    @OneToMany(() => Cabezera_Factura, (Cabezera_Factura) => Cabezera_Factura.Numero)
    facturas:Cabezera_Factura[]
    
}