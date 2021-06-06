import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente, ClienteDocument } from './schemas/clientes.schema';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente.name)
    private readonly clienteModel: Model<ClienteDocument>,
  ) {}

  async getClients(): Promise<Cliente[]> {
    const found = await this.clienteModel.find();
    return found;
  }

  async createCliente(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { shortId } = createClienteDto;

    const found = await this.clienteModel.findOne({ shortId });

    if (found) {
      throw new ConflictException('El cliente ya existe');
    }

    const cliente = new this.clienteModel({
      ...createClienteDto,
    });

    await cliente.save();
    return cliente;
  }

  async getClientById(id: string): Promise<Cliente> {
    const found = await this.clienteModel.findById(id);

    if (!found) {
      throw new ConflictException('El cliente no existe');
    }

    return found;
  }

  async deleteCliente(id: string): Promise<void> {
    const found = await this.getClientById(id);

    if (found) {
      await this.clienteModel.findByIdAndDelete({ _id: id });
    }
    return;
  }

  async updateCliente(
    id: string,
    createClienteDto: CreateClienteDto,
  ): Promise<Cliente> {
    const update = await this.clienteModel.findByIdAndUpdate(
      { _id: id },
      { $set: createClienteDto },
    );
    return update;
  }
}
