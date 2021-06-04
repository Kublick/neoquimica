import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './schemas/clientes.schema';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Get()
  getClients(): Promise<Cliente[]> {
    return this.clienteService.getClients();
  }

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.createCliente(createClienteDto);
  }
}
