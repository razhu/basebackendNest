import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
        id: 1,
        name: 'leche con cafe',
        brand: 'leche con cafe',
        flavors: ['manzanilla', 'narnaja']
        }
    ];
    findAll() {
        return this.coffees;
    }
    findOne(id: string) {
        // throw 'random error!!!'
        let coffeeFound = this.coffees.find(item => item.id === +id)
        if (!coffeeFound) {
            // throw new HttpException (`no se encontro cafe con id ${id}`, HttpStatus.NOT_FOUND)
            throw new NotFoundException (`no se encontro cafe con id ${id}`)
        }
        return coffeeFound
    }
    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto)
        // return this.coffees
        // return createCoffeeDto
        return 'item recontracreated'
    }
    update(id: string, createCoffeeDto: any) {
        const existingCoffee =  this.findOne(id)
        if (existingCoffee) {
            //update coffee
        }
        return 'updated'
    }
    remove(id: string) {
        const coffeeIndex =  this.coffees.findIndex(item => item.id === +id)
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1)
        }
        return 'deleted!'
    }
}