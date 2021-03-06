import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import {ApiTags} from '@nestjs/swagger'
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    // @UsePipes(ValidationPipe) // it can be added on a single method
    // @SetMetadata('isPublic', true) // its ok but will be using customed annotation

    // @ApiResponse({status: 403, description: 'Forbidden'})
    @ApiTags('coffees||')
    // @ApiForbiddenResponse({ description: 'Forbidden'})
    @Public()
    @Get()
    async findAll(
        @Protocol('http') protocol: string,
        @Query() paginationQuery: PaginationQueryDto) {
        // const { limit, offset } = queries
        // await new Promise((resolve ) => {setTimeout(resolve, 5000)})
        console.log('protocol.... ', protocol);
        return this.coffeesService.findAll(paginationQuery);
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.coffeesService.findOne(''+id)
    }
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto)
    }
    @Patch(':id')
    // update(@Param('id') id: string, @Body(validationPipe) updateCoffeeDto: UpdateCoffeeDto) {
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto)
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id)
    }
}
