import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expenses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private readonly repo: Repository<Expense>,
  ) {}

  async addExpense(description: string, amount: number, date: Date, userId: number) {
    if (!description || !amount || !date)
      throw new BadRequestException(
        `Something is missing... Please insert the description, amount and date of the expense to proceed.`,
      );
    if (amount <= 0)
      throw new BadRequestException('Expense value must be higher than zero.');

    const newExpense = this.repo.create({ description, amount, date, userId });
    return await this.repo.save(newExpense);
  }
}
