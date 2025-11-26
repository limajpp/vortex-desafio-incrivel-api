import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExpenseDTO } from './DTOs/create-expense-dto';
import { ExpenseService } from './expense.service';
import { UpdateExpenseDTO } from './DTOs/update-expense-dto';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly serv: ExpenseService) {}

  @Post()
  createExpense(@Body() body: CreateExpenseDTO, @Request() req) {
    const fixedDate = new Date(`${body.date}T12:00:00`);

    return this.serv.addExpense(
      body.description,
      body.amount,
      fixedDate,
      Number(req.user.sub),
    );
  }

  @Get()
  getAllExpenses(
    @Request() req,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const userId = req.user.sub;
    const monthNumber = month ? Number(month) : undefined;
    const yearNumber = year ? Number(year) : undefined;

    return this.serv.listExpenses(userId, monthNumber, yearNumber);
  }

  @Patch('/:id')
  updateExpense(
    @Param('id') id: number,
    @Body() body: UpdateExpenseDTO,
    @Request() req,
  ) {
    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('No data provided for update.');
    }

    const userId = req.user.sub;
    const updateData: any = { ...body };
    if (body.date) {
      updateData.date = new Date(`${body.date}T12:00:00`);
    }

    return this.serv.updateExpense(id, userId, updateData);
  }
}
