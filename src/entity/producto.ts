import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {Categoria} from "./categoria";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(type => Categoria)
    @JoinColumn({name: 'categoria_id'})
    categoria: Categoria;

    @Column()
    precio: number;

    @Column()
    inventario: number;
}