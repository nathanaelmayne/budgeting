import React, { useEffect } from 'react';
import './App.scss';
import ExpenseForm from './components/expense-form/ExpenseForm';
import IncomeForm from './components/income-form/IncomeForm';
import Modal from './components/modal/Modal';
import TextButton from './components/text-button/TextButton';
import { Expense } from './models/expense.model';
import { Income } from './models/income.model';

function App() {
  const [showAddExpenseModal, setShowAddExpenseModal] = React.useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = React.useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = React.useState(false);
  const [showEditIncomeModal, setShowEditIncomeModal] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [incomes, setIncomes] = React.useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = React.useState<Expense>();
  const [editingIncome, setEditingIncome] = React.useState<Income>();

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

  function handleAddIncome(income: Income) {
    setIncomes((prevState) => [...prevState, income]);
    setShowAddIncomeModal(false);
  }

  function handleEditExpense(expense: Expense) {
    const copy = [...expenses];
    const index = expenses.findIndex((e) => e.id === expense.id);
    copy.splice(index, 1, expense);
    setExpenses(copy);
    setShowEditExpenseModal(false);
  }

  function handleEditIncome(income: Income) {
    const copy = [...incomes];
    const index = incomes.findIndex((e) => e.id === income.id);
    copy.splice(index, 1, income);
    setIncomes(copy);
    setShowEditIncomeModal(false);
  }

  function openAddExpenseDialog() {
    setShowAddExpenseModal(true);
  }

  function openAddIncomeDialog() {
    setShowAddIncomeModal(true);
  }

  function openEditExpenseDialog(expense: Expense) {
    setEditingExpense(expense);
    setShowEditExpenseModal(true);
  }

  function openEditIncomeDialog(income: Income) {
    setEditingIncome(income);
    setShowEditIncomeModal(true);
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="actions">
          <TextButton onClick={() => openAddExpenseDialog()}>
            Add Expense
          </TextButton>
          <TextButton onClick={() => openAddIncomeDialog()}>
            Add Income
          </TextButton>
        </div>
        <div className="historical-expenses">
          <table>
            <tbody>
              {incomes.map((income) => (
                <tr
                  onClick={() => openEditIncomeDialog(income)}
                  key={income.id}
                >
                  <td>{income.name}</td>
                  <td>{income.amount}</td>
                  <td>{income.timestamp}</td>
                </tr>
              ))}
              {expenses.map((expense) => (
                <tr
                  onClick={() => openEditExpenseDialog(expense)}
                  key={expense.id}
                >
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddExpenseModal && (
        <Modal onClose={() => setShowAddExpenseModal(false)}>
          <ExpenseForm handleExpenseSaved={(e) => handleAddExpense(e)} />
        </Modal>
      )}

      {showEditExpenseModal && (
        <Modal onClose={() => setShowEditExpenseModal(false)}>
          <ExpenseForm
            editingExpense={editingExpense}
            handleExpenseSaved={(e) => handleEditExpense(e)}
          />
        </Modal>
      )}

      {showAddIncomeModal && (
        <Modal onClose={() => setShowAddIncomeModal(false)}>
          <IncomeForm handleIncomeSaved={(e) => handleAddIncome(e)} />
        </Modal>
      )}

      {showEditIncomeModal && (
        <Modal onClose={() => setShowEditIncomeModal(false)}>
          <IncomeForm
            editingIncome={editingIncome}
            handleIncomeSaved={(e) => handleEditIncome(e)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
