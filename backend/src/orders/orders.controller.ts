import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetEmployee } from 'src/auth/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getOrderds(): Promise<Order[]> {
    return this.orderService.getOders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOderById(id);
  }

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetEmployee('sucursal') sucursal: string,
  ): Promise<Order> {
    return this.orderService.createOrder(createOrderDto, sucursal);
  }
}
