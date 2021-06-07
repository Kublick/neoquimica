import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/orders.schema';
import { AuthModule } from 'src/auth/auth.module';
import { SucursalModule } from 'src/sucursal/sucursal.module';
import { OrderData, OrderDataSchema } from './schemas/orderData.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    AuthModule,
    SucursalModule,
    MongooseModule.forFeature([
      { name: OrderData.name, schema: OrderDataSchema },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
