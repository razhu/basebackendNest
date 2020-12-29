import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'ramiro',
    password: 'ramiro',
    database: 'nest2',
    // entities: [Coffee],
    // entities: ["src/**/**/**.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
