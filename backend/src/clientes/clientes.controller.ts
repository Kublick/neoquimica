import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Delete('/:id')
  deleteCliente(@Param('id') id: string): Promise<void> {
    return this.clienteService.deleteCliente(id);
  }

  @Put('/:id')
  updateCliente(
    @Param('id')
    id: string,
    @Body()
    createClienteDto: CreateClienteDto,
  ): Promise<Cliente> {
    return this.clienteService.updateCliente(id, createClienteDto);
  }
}
