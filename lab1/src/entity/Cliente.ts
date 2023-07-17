import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany } from "typeorm"
import { Cabezera_Factura } from "./Cabezera_Factura"
@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    Ruc_Cliente: number

    @Column({ length: 50 })
    Nombre: string

    @Column({ length: 20 })
   Apellido1 : string

    @Column({ length: 20 })
   apellido2 : string

    @Column()
    fechasdenacimiendo: Date

    @Column({ length: 1 })
    Genero: string

    @Column()
    Estado: boolean

    @OneToMany(() => Cabezera_Factura, (Cabezera_Factura) => Cabezera_Factura.Numero)
    facturas:Cabezera_Factura[]

}
