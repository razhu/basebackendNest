import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { ConfigModule } from '@nestjs/config'

class MockCoffeesService {}
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), 
    ConfigModule ],
    controllers: [CoffeesController],
    providers: [    
        CoffeesService,
/*          {
         provide: ConfigService, 
         useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
     },
    {
        provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe']
    } */
],
    exports: [CoffeesService]
})
export class CoffeesModule {}
