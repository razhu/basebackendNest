import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ){}
    findAll() {
        return this.coffeeRepository.find(
            {
                relations: ['flavors']
            }
        )
    }
    async findOne(id: string) {
        // throw 'random error!!!'
        let coffeeFound = await this.coffeeRepository.findOne(id, {
            relations: ['flavors']
        });
        if (!coffeeFound) { 
            // throw new HttpException (`no se encontro cafe con id ${id}`, HttpStatus.NOT_FOUND)
            throw new NotFoundException (`no se encontro cafe con id ${id}`)
        }
        return coffeeFound
    }
    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }
    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee =  await this.coffeeRepository.preload(
            {
                id: +id,
                ...updateCoffeeDto
            }
        )
        if(!coffee) {
            throw new NotFoundException(`Coffee with id ${id} not found`)
        } 
        return this.coffeeRepository.save(coffee)
    }
    async remove(id: string) {
        const coffee = await this.findOne(id)
        return this.coffeeRepository.remove(coffee)
    }
}