import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetEmployee } from 'src/auth/get-user.decorator';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './schemas/clientes.schema';

@Controller('clientes')
@UseGuards(AuthGuard())
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Get()
  getClients(@GetEmployee('sucursal') sucursal: string): Promise<Cliente[]> {
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
