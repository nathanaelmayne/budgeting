import React from 'react';
import './App.scss';
import ExpenseForm from './components/expense-form/ExpenseForm';
import { Expense } from './models/expense.model';

function App() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  function handleAddExpense(expense: Expense) {
    setExpenses((prevState) => [...prevState, expense]);
  }

  return (
    <div className="app">
      <ExpenseForm onAddExpense={(e) => handleAddExpense(e)} />
      {expenses.map((expense) => (
        <p key={expense.id}>{expense.name}</p>
      ))}
    </div>
  );
}

export default App;
