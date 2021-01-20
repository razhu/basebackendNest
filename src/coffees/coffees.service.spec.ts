import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';

type MockRepository<T=any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn()
})

describe('CoffeesService', () => {
   let service: CoffeesService;

   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [
         CoffeesService,
         { provide: Connection, useValue:{} },
         { provide: getRepositoryToken(Flavor), useValue: createMockRepository },
         { provide: getRepositoryToken(Coffee), useValue: createMockRepository },
       ],
     }).compile();

     service = module.get<CoffeesService>(CoffeesService);
   });

   it('should be defined', () => {
     expect(service).toBeDefined();
   });
  
   describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {}

        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      })
    })
    describe('otherwise', () => {
      it('should throw "NotFoundException"', async () => {
        
      })
    })    
  })
});

