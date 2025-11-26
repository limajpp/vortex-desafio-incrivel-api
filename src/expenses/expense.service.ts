import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expenses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private readonly repo: Repository<Expense>,
  ) {}

  async addExpense(
    description: string,
    amount: number,
    date: Date,
    userId: number,
  ) {
    if (!description || !amount || !date)
      throw new BadRequestException(
        `Something is missing... Please insert the description, amount and date of the expense to proceed.`,
      );
    if (amount <= 0)
      throw new BadRequestException('Expense value must be higher than zero.');

    const newExpense = this.repo.create({ description, amount, date, userId });
    return await this.repo.save(newExpense);
  }

  async listExpenses(userId: number, month?: number, year?: number) {
    const query = this.repo
      .createQueryBuilder('expense')
      .where('expense.userId = :userId', { userId });

    if (month) {
      query.andWhere('EXTRACT(MONTH FROM expense.date) = :month', { month });
    }
    if (year) {
      query.andWhere('EXTRACT(YEAR FROM expense.date) = :year', { year });
    }
    query.orderBy('expense.date', 'DESC');

    return await query.getMany();
  }

  async updateExpense(id: number, userId: number, attrs: Partial<Expense>) {
    const expense = await this.repo.findOneBy({ id, userId });

    if (!expense)
      throw new NotFoundException('Expense not found or permission denied.');

    Object.assign(expense, attrs);
    return this.repo.save(expense);
  }

  async deleteExpense(userId: number, id: number) {
    const expense = await this.repo.findOneBy({ id, userId });

    if (!expense)
      throw new NotFoundException('Expense not found or permission denied.');

    return this.repo.remove(expense);
  }
}
