import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SucursalService } from 'src/sucursal/sucursal.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly sucursalService: SucursalService,
  ) {}
  async getOderById(id: string): Promise<Order> {
    const found = this.orderModel.findById({ _id: id });
    if (!found) {
      throw new ConflictException('No existe la orden');
    }
    return found;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    sucursal: string,
  ): Promise<any> {
    const suc = await this.sucursalService.getSucursalById(sucursal);

    console.log(createOrderDto);

    if (suc) {
      console.log(suc);
      return;
    }
  }
}
