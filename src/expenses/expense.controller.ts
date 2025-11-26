import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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

  
}
