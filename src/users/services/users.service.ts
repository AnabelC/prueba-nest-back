import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './../entities/user.entity';
import { Order } from './../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'ejemplo@correo.com',
      password: '987654321',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id == id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId += this.counterId;
    const newProdut = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newProdut);
    return newProdut;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
