import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import {Categoria} from "./categoria";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToOne(type => Categoria)
    @JoinColumn()
    categoria: Categoria;

    @Column()
    precio: number;

    @Column()
    inventario: number;
}