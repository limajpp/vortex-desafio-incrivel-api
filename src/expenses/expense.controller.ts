import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExpenseDTO } from './DTOs/create-expense-dto';
import { ExpenseService } from './expense.service';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly serv: ExpenseService) {}

  @Post()
  createExpense(@Body() body: CreateExpenseDTO, @Request() req) {
    return this.serv.addExpense(
      body.description,
      body.amount,
      new Date(body.date),
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
}
