import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetEmployee } from 'src/auth/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private readonly OrderService: OrdersService) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetEmployee('sucursal') sucursal: string,
  ): Promise<any> {
    return this.OrderService.createOrder(createOrderDto, sucursal);
  }
}
