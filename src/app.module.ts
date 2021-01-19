import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingService } from './coffee-rating/coffee-rating.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'agetic',
    password: 'agetic',
    database: 'borrar',
    // entities: [Coffee],
    // entities: ["src/**/**/**.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
  }), CoffeeRatingModule],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingService],
})
export class AppModule {}
