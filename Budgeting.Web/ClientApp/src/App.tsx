import React, { useEffect } from 'react';
import './App.scss';
import ExpenseForm from './components/expense-form/ExpenseForm';
import Modal from './components/modal/Modal';
import TextButton from './components/text-button/TextButton';
import { Expense } from './models/expense.model';

function App() {
  const [showAddExpenseModal, setShowAddExpenseModal] = React.useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = React.useState<Expense>();

  useEffect(() => {
    setExpenses(() => JSON.parse(localStorage.getItem('expenses') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  function handleAddExpense(expense: Expense) {
    setExpenses((prevState) => [...prevState, expense]);
    setShowAddExpenseModal(false);
  }

  function handleEditExpense(expense: Expense) {
    const copy = [...expenses];
    const index = expenses.findIndex((e) => e.id === expense.id);
    copy.splice(index, 1, expense);
    setExpenses(copy);
    setShowEditExpenseModal(false);
  }

  function openAddExpenseDialog() {
    setShowAddExpenseModal(true);
  }

  function openEditExpenseDialog(expense: Expense) {
    setEditingExpense(expense);
    setShowEditExpenseModal(true);
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
                <tr
                  onClick={() => openEditExpenseDialog(expense)}
                  key={expense.id}
                >
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.intervalDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddExpenseModal && (
        <Modal>
          <ExpenseForm handleExpenseSaved={(e) => handleAddExpense(e)} />
        </Modal>
      )}

      {showEditExpenseModal && (
        <Modal>
          <ExpenseForm
            editingExpense={editingExpense}
            handleExpenseSaved={(e) => handleEditExpense(e)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
