import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from './../services/products.service';

import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/product.dto';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/filter')
  getProductFilter(): string {
    return 'Yo soy un Filter';
  }

  @Get('')
  @ApiOperation({ summary: 'Lista todos los productos' })
  getAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.productsService.findAll();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Retorna el detalle de un producto ' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto ' })
  create(@Body() payload: CreateProductDto) {
    this.productsService.create(payload);
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Actualiza un producto ' })
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    this.productsService.update(productId, payload);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Eliminar un producto ' })
  delete(@Param('productId', ParseIntPipe) productId: number) {
    this.productsService.remove(productId);
  }
}
