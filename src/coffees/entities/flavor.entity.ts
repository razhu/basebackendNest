import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoffeesController } from "../coffees.controller";
import { CoffeesService } from "../coffees.service";
import { Coffee } from "./coffee.entity";

@Entity('flavors')
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavors
    )
    coffees: Coffee[];
}