import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SucursalService } from 'src/sucursal/sucursal.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/orders.schema';
import { format } from 'date-fns';
import { OrderData, OrderDataDocument } from './schemas/orderData.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly sucursalService: SucursalService,
    @InjectModel(OrderData.name)
    private readonly orderDataModel: Model<OrderDataDocument>,
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
  ): Promise<Order> {
    const suc = await this.sucursalService.getSucursalById(sucursal);
    const sucId = suc.id + format(new Date(), 'yyMM');
    try {
      const order = await this.orderDataModel.find({ sucId: sucId });
      if (order.length === 0) {
        const orderData = new this.orderDataModel({
          sucId: sucId,
          consec: 1,
        });
        await orderData.save();
      } else {
        await this.orderDataModel.findByIdAndUpdate(
          { _id: order[0]._id },
          { $set: { consec: order[0].consec + 1 } },
        );
      }
    } catch (error) {
      console.log('error', error);
    }
    try {
      const order = await this.orderDataModel.find({ sucId: sucId });

      const consec = function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width
          ? n
          : new Array(width - n.length + 1).join(z) + n;
      };
      const number = consec(order[0].consec, 3, 0);

      const orderId = order[0].sucId + number;
      const newOrder = new this.orderModel({
        ...createOrderDto,
        orden: orderId,
        currentStatus: false,
      });
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async getOders(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  // Add Register desde las maquinas
}
