import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import {Event } from '../events/entities/event.entity';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';
@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
        // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    ){
        // console.log(coffeeBrands);
    }
    findAll(paginationQuery: PaginationQueryDto) {
        const {limit, offset } = paginationQuery
        return this.coffeeRepository.find(
            {
                relations: ['flavors'],
                skip: offset,
                take: limit
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
    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }
    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        ))
        const coffee =  await this.coffeeRepository.preload(
            {
                id: +id,
                ...updateCoffeeDto,
                flavors,
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

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = 'recommended coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: coffee.id};
            
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (e) {
            console.log('e ', e);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }    
    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({name});
        if (existingFlavor) {
            return existingFlavor
        }
        return this.flavorRepository.create({name});
    }
}