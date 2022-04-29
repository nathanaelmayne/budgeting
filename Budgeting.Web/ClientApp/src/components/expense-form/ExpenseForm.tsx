import React, { useEffect, useState } from 'react';
import { Expense } from '../../models/expense.model';
import InputField from '../input-field/InputField';
import TextButton from '../text-button/TextButton';
import './ExpenseForm.scss';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleExpenseSaved: (expense: Expense) => void;
  editingExpense?: Expense;
}

function ExpenseForm({ handleExpenseSaved, editingExpense }: Props) {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');
  const [expense, setExpense] = useState<Expense>();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editingExpense) {
      setEditing(true);
      setName(editingExpense.name);
      setAmount(editingExpense.amount.toString());
      setTimestamp(editingExpense.timestamp.toString());
      setExpense(editingExpense);
    }
  }, []);

  useEffect(() => {
    if (!expense || editing) {
      return;
    }
    handleExpenseSaved(expense);
  }, [expense]);

  function handleAddExpense() {
    setExpense({
      id: crypto.randomUUID(),
      name,
      amount: parseInt(amount, 10),
      timestamp,
    });
  }

  function handleEditExpense() {
    if (!expense) return;

    const newExpense: Expense = {
      id: expense.id,
      name,
      amount: parseInt(amount, 10),
      timestamp,
    };

    setEditing(false);
    setExpense(newExpense);
  }

  return (
    <div className="ExpenseForm">
      <InputField label="Name">
        <input
          defaultValue={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </InputField>

      <InputField label="Amount">
        <input
          defaultValue={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </InputField>

      <InputField label="Date">
        <input
          defaultValue={timestamp}
          type="text"
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </InputField>

      <div className="button-wrapper">
        {editing && (
          <TextButton onClick={() => handleEditExpense()}>
            Edit Expense
          </TextButton>
        )}
        {!editing && (
          <TextButton onClick={() => handleAddExpense()}>
            Add Expense
          </TextButton>
        )}
      </div>
    </div>
  );
}

ExpenseForm.defaultProps = {
  editingExpense: undefined,
};

export default ExpenseForm;
