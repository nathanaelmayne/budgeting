import React from 'react';
import './App.scss';
import ExpenseForm from './components/expense-form/ExpenseForm';
import Modal from './components/modal/Modal';
import TextButton from './components/text-button/TextButton';
import { Expense } from './models/expense.model';

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  function handleAddExpense(expense: Expense) {
    setExpenses((prevState) => [...prevState, expense]);
    setShowModal(false);
  }

  function openAddExpenseDialog() {
    setShowModal(true);
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="actions">
          <TextButton onClick={() => openAddExpenseDialog()}>
            Add Expense
          </TextButton>
          <TextButton onClick={() => openAddExpenseDialog()}>
            Add Income
          </TextButton>
          <TextButton onClick={() => openAddExpenseDialog()}>
            Update Balance
          </TextButton>
        </div>
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

      {showModal && (
        <Modal>
          <ExpenseForm onAddExpense={(e) => handleAddExpense(e)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
