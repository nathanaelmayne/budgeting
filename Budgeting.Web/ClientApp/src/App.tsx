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
    <div className="App">
      <ExpenseForm onAddExpense={(e) => handleAddExpense(e)} />
      <div className="historical-expenses">
        <table>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.intervalDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
