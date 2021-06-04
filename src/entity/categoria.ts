import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;

}