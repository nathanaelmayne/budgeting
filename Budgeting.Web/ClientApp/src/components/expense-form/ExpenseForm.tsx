import React, { useEffect, useState } from 'react';
import { Expense } from '../../models/expense.model';
import InputField from '../input-field/InputField';

export interface ExpenseFormProps {
  // eslint-disable-next-line no-unused-vars
  onAddExpense: (expense: Expense) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [intervalDays, setIntervalDays] = useState<number>(0);
  const [expense, setExpense] = useState<Expense>();

  useEffect(() => {
    if (!expense) {
      return;
    }
    onAddExpense(expense);
  }, [expense]);

  function handleAddExpense() {
    setExpense({
      id: crypto.randomUUID(),
      name,
      amount,
      intervalDays,
    });

    if (!expense) {
      return;
    }

    onAddExpense(expense);
  }

  return (
    <div className="expense-container-form">
      <InputField label="Name">
        <input
          defaultValue={name}
          type="string"
          onChange={(e) => setName(e.target.value)}
        />
      </InputField>

      <InputField label="Amount">
        <input
          defaultValue={amount}
          type="number"
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        />
      </InputField>

      <InputField label="Interval (Days)">
        <input
          defaultValue={intervalDays}
          type="number"
          onChange={(e) => setIntervalDays(parseInt(e.target.value, 10))}
        />
      </InputField>

      <button onClick={handleAddExpense} type="button">
        Add Expense
      </button>
    </div>
  );
}

export default ExpenseForm;
