import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly serv: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Expense' })
  @ApiResponse({
    status: 201,
    description: 'Expense was created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  createExpense(@Body() body: CreateExpenseDTO, @Request() req) {
    return this.serv.addExpense(
      body.description,
      body.amount,
      body.date,
      Number(req.user.sub),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all expenses' })
  @ApiQuery({ name: 'year', required: false, description: 'Filter by year' })
  @ApiResponse({
    status: 200,
    description: 'Expenses list returned successfully.',
  })
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
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({ status: 200, description: 'Expense Updated' })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  updateExpense(
    @Param('id') id: number,
    @Body() body: UpdateExpenseDTO,
    @Request() req,
  ) {
    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('No data provided for update.');
    }

    const userId = req.user.sub;

    return this.serv.updateExpense(id, userId, body as any);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an expense' })
  @ApiResponse({ status: 200, description: 'Expense removed' })
  deleteExpense(@Param('id') id: number, @Request() req) {
    const userId = req.user.sub;
    return this.serv.deleteExpense(userId, id);
  }
}
