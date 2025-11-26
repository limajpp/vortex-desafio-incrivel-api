import { Expense } from '../entities/expenses.entity';

describe('Expense', () => {
  it('should be defined', () => {
    expect(new Expense()).toBeDefined();
  });
});
